import { get, isFunction } from 'lodash-es';
import { BehaviorSubject, from, Observable, of, Subject, timer } from 'rxjs';
import { catchError, map, retry, skipWhile, switchMap, tap } from 'rxjs/operators';
import { Inject, Injectable, Optional } from '@angular/core';
import {
  NB_TRANS_DEFAULT_LANG,
  NB_TRANS_LOADER,
  NB_TRANS_MAX_RETRY,
  NbTransLang,
} from '../constants';
import { INbTransChangeLang, INbTransLoader, INbTransOptions, INbTranslation } from '../models';
import { NbTransToolsService } from './nb-trans-tools.service';

@Injectable({ providedIn: 'root' })
export class NbTransService {
  private lang$ = new BehaviorSubject<string>(NbTransLang.ZH_CN);

  private loadDefaultOver$ = new BehaviorSubject<boolean>(false);

  private loadLangTrans$ = new Subject<boolean>();

  private retry: number = 5;

  private translations: { [key: string]: INbTranslation } = {};

  /**
   * Current language value
   */
  get lang(): string {
    return this.lang$.value;
  }

  /**
   * Whether the translated file of the default language is loaded
   */
  get loadDefaultOver(): boolean {
    return this.loadDefaultOver$.value;
  }

  /**
   * Get the first language of browser
   */
  static getBrowserLang(): string | undefined {
    if (!NbTransToolsService.checkNavigator()) {
      return undefined;
    }
    return window?.navigator?.language;
  }

  /**
   * Get a language array known to the user, by order of preference
   */
  static getBrowserLangs(): readonly string[] | undefined {
    if (!NbTransToolsService.checkNavigator()) {
      return undefined;
    }
    return window?.navigator?.languages;
  }

  constructor(
    @Inject(NB_TRANS_DEFAULT_LANG) @Optional() private transDefaultLang: string,
    @Inject(NB_TRANS_LOADER) @Optional() private transLoader: INbTransLoader,
    @Inject(NB_TRANS_MAX_RETRY) @Optional() private maxRetry: number,
    private transToolsService: NbTransToolsService
  ) {
    // if the maxRetry is undefined/null, use default settings,
    // so can set the retry valus as 0 to cancel retry action.
    this.retry = this.maxRetry == null ? this.retry : this.maxRetry;

    this.transLoader = this.transLoader || {};

    this.lang$.next(transDefaultLang || NbTransLang.ZH_CN);
    this.loadDefaultTrans();
  }

  /**
   * Switch language async
   * @param lang language key
   */
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
      timer(1).subscribe(() => this.loadLangTrans$.next(false));
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

  /**
   * Switch language sync
   * @param lang language key
   */
  changeLangSync(lang: string): void {
    this.changeLang(lang).subscribe();
  }

  /**
   * get the first language of browser
   * @deprecated
   */
  getBrowserLang(): string | undefined {
    console.warn(
      'The function will be deprecated in the future, we recommend using NbTransService.getBrowserLang()!'
    );
    return NbTransService.getBrowserLang();
  }

  /**
   * get a language array known to the user, by order of preference
   * @deprecated
   */
  getBrowserLangs(): readonly string[] | undefined {
    console.warn(
      'The function will be deprecated in the future, we recommend using NbTransService.getBrowserLangs()!'
    );
    return NbTransService.getBrowserLangs();
  }

  /**
   * Get translated text asynchronously based on key and options
   * @param key trans key
   * @param options trans options
   */
  translationAsync(key: string, options?: INbTransOptions): Observable<string> {
    return this.lang$.pipe(
      switchMap(() => {
        return this.translations[this.lang]
          ? of({ trans: this.translations[this.lang], result: true })
          : this.loadLangTrans$;
      }),
      map(() => this.translationSync(key, options))
    );
  }

  /**
   * Synchronously get translated text according to key and options
   * @param key trans key
   * @param options trans options
   */
  translationSync(key: string, options?: INbTransOptions): string {
    const finalKey = this.transToolsService.getFinalKey(key, options?.prefix);
    const emptyTrans = options?.returnKeyWhenEmpty === false ? '' : finalKey;
    let trans = get(this.translations[this.lang], finalKey);

    // if the trans is boolean/number or other types, it is invalid.
    // Although boolean and number can be implicitly converted to string types,
    // it would be more expected and better when let the developer provide the value of the string type directly.
    // if the trans only include some whitespace, like ' ', it is valid
    if (!this.transToolsService.isTranslatedStringValid(trans)) {
      trans = get(this.translations[this.transDefaultLang], finalKey);
    }

    if (!this.transToolsService.isTranslatedStringValid(trans)) {
      return emptyTrans;
    }

    const params = options?.params;
    return this.transToolsService.handleSentenceWithParams(trans as string, params);
  }

  /**
   * An subscribe event of switching language
   */
  subscribeLangChange(): Observable<string> {
    return this.lang$.asObservable();
  }

  /**
   * Whethe the translated file of default lang has been load over
   */
  subscribeLoadDefaultOver(): Observable<boolean> {
    return this.loadDefaultOver
      ? of(true)
      : this.loadDefaultOver$.asObservable().pipe(
          // the loadDefaultOver$ is BehaviorSubject,
          // so the user will get a value immediately when subscribe it,
          // but it doesn't make sense, so here will skip it
          skipWhile((result, index) => !result && index === 0)
        );
  }

  private loadDefaultTrans(): void {
    this.loadTrans(this.lang)
      .pipe(map(trans => !!trans))
      .subscribe(result => {
        this.loadDefaultOver$.next(result);
        this.loadDefaultOver$.complete();
        this.loadLangTrans$.next(result);
      });
  }

  private loadLangTrans(lang: string): Observable<boolean> {
    return this.loadTrans(lang).pipe(
      map(trans => !!trans),
      tap(result => this.loadLangTrans$.next(result))
    );
  }

  private loadTrans(lang: string): Observable<INbTranslation | null> {
    const loader = this.transLoader[lang];
    if (!loader) {
      return of(null);
    }

    const loaderFn: Observable<INbTranslation> = isFunction(loader)
      ? // switch map as load lang observable,
        // so it will retry when failure to load the lang content
        of(null).pipe(switchMap(() => from(loader()) as Observable<INbTranslation>))
      : of(loader);
    return loaderFn.pipe(
      tap(trans => (this.translations[lang] = trans)),
      retry(this.retry),
      catchError(() => of(null))
    );
  }
}
