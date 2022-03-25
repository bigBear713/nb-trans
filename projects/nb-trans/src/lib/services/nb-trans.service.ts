import { get, isFunction } from 'lodash-es';
import { BehaviorSubject, from, Observable, of, Subject, timer } from 'rxjs';
import { catchError, map, retry, skipWhile, switchMap, tap } from 'rxjs/operators';
import { Inject, Injectable, Optional } from '@angular/core';
import { NB_TRANS_DEFAULT_LANG, NB_TRANS_LOADER, NB_TRANS_MAX_RETRY_TOKEN, NbTransLangEnum } from '../constants';
import { INbTransChangeLang, INbTransLoader, INbTransOptions } from '../models';
import { NbTransToolsService } from './nb-trans-tools.service';

@Injectable({ providedIn: 'root' })
export class NbTransService {

  private lang$ = new BehaviorSubject<string>(NbTransLangEnum.ZH_CN);

  private loadDefaultOver$ = new BehaviorSubject<boolean>(false);

  private loadLangTrans$ = new Subject<boolean>();

  private retry: number = 5;

  private translations: { [key: string]: Object } = {};

  get lang(): string {
    return this.lang$.value;
  }

  get loadDefaultOver(): boolean {
    return this.loadDefaultOver$.value;
  }

  static getBrowserLang(): string | undefined {
    if (!NbTransToolsService.checkNavigator()) {
      return undefined;
    }
    return window?.navigator?.language;
  }

  static getBrowserLangs(): readonly string[] | undefined {
    if (!NbTransToolsService.checkNavigator()) {
      return undefined;
    }
    return window?.navigator?.languages;
  }

  constructor(
    @Inject(NB_TRANS_DEFAULT_LANG) @Optional() private transDefaultLang: string,
    @Inject(NB_TRANS_LOADER) @Optional() private transLoader: INbTransLoader,
    @Inject(NB_TRANS_MAX_RETRY_TOKEN) @Optional() private maxRetry: number,
    private transToolsService: NbTransToolsService,
  ) {
    // if the maxRetry is undefined/null, use default settings,
    // so can set the retry valus as 0 to cancel retry action.
    this.retry = this.maxRetry == null ? this.retry : this.maxRetry;

    this.transLoader = this.transLoader || {};

    this.lang$.next(transDefaultLang || NbTransLangEnum.ZH_CN);
    this.loadDefaultTrans();
  }

  changeLang(lang: string): Observable<INbTransChangeLang> {
    const successResult: INbTransChangeLang = {
      curLang: lang,
      result: true,
    };
    const failureResult: INbTransChangeLang = {
      curLang: this.lang,
      result: false,
    };

    // the lang has been loaded,
    if (this.translations[lang]) {
      this.lang$.next(lang);
      return of(successResult);
    }

    // there is no any lang loader
    if (!this.transLoader[lang]) {
      timer().subscribe(_ => this.loadLangTrans$.next(false));
      return of(failureResult);
    }

    return this.loadLangTrans(lang).pipe(
      switchMap(loadResult => {
        let curLang = this.lang;
        let result = failureResult;
        if (loadResult) {
          curLang = lang;
          result = successResult;
        }
        this.lang$.next(curLang);
        return of(result);
      })
    );
  }

  changeLangSync(lang: string): void {
    this.changeLang(lang).subscribe();
  }

  getBrowserLang(): string | undefined {
    console.warn('The function will be deprecated in the future, we recommend using NbTransService.getBrowserLang()!');
    return NbTransService.getBrowserLang();
  }

  getBrowserLangs(): readonly string[] | undefined {
    console.warn('The function will be deprecated in the future, we recommend using NbTransService.getBrowserLangs()!');
    return NbTransService.getBrowserLangs();
  }

  translationAsync(key: string, options?: INbTransOptions): Observable<string> {
    return this.lang$.pipe(
      switchMap(_ => {
        return this.translations[this.lang]
          ? of({ trans: this.translations[this.lang], result: true })
          : this.loadLangTrans$;
      }),
      map(_ => this.translationSync(key, options))
    );
  }

  translationSync(key: string, options?: INbTransOptions): string {
    const finalKey = this.transToolsService.getFinalKey(key, options?.prefix);
    const emptyTrans = options?.returnKeyWhenEmpty === false ? '' : finalKey;
    let trans = get(this.translations[this.lang], finalKey);

    if (!trans) {
      trans = get(this.translations[this.transDefaultLang], finalKey);
    }

    if (!trans) {
      return emptyTrans;
    }

    const params = options?.params;
    trans = this.transToolsService.handleSentenceWithParams(trans, params);

    return trans || emptyTrans;
  }

  subscribeLangChange(): Observable<string> {
    return this.lang$.asObservable();
  }

  subscribeLoadDefaultOver(): Observable<boolean> {
    return this.loadDefaultOver
      ? of(true)
      : this.loadDefaultOver$.asObservable().pipe(
        // the loadDefaultOver$ is BehaviorSubject, 
        // so the user will get a value immediately when subscribe it, 
        // but it doesn't make sense, so here will skip it
        skipWhile((result, index) => (!result && (index === 0)))
      );
  }

  private loadDefaultTrans(): void {
    this.loadTrans(this.lang).subscribe(trans => {
      const result = !!trans;
      this.loadDefaultOver$.next(result);
      this.loadDefaultOver$.complete();
      this.loadLangTrans$.next(result);
    });
  }

  private loadLangTrans(lang: string): Observable<boolean> {
    return this.loadTrans(lang).pipe(
      map(trans => {
        const result = !!trans;
        this.loadLangTrans$.next(result);
        return result;
      })
    );
  }

  private loadTrans(lang: string): Observable<Object | null> {
    const loader = this.transLoader[lang];
    if (!loader) {
      return of(null);
    }

    const loaderFn: Observable<Object> = isFunction(loader)
      // switch map as load lang observable, 
      // so it will retry when failure to load the lang content
      ? of(null).pipe(switchMap(() => from(loader())))
      : of(loader);
    return loaderFn.pipe(
      tap(trans => this.translations[lang] = trans),
      retry(this.retry),
      catchError(_ => of(null))
    );
  }

}
