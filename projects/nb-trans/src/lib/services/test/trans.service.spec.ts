import { inject, TestBed } from '@angular/core/testing';
import { filter, switchMap, take } from 'rxjs/operators';
import { NB_TRANS_DEFAULT_LANG, NB_TRANS_LOADER, NB_TRANS_MAX_RETRY_TOKEN, NbTransLangEnum } from '../../constants';
import { translationSyncTestData, transLoader, NbTransTestingModule } from '../../testing';
import { NbTransService } from '../trans.service';

describe('Service: NgTrans', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NbTransTestingModule]
    });
  });

  it('should be created', inject([NbTransService], (service: NbTransService) => {
    expect(service).toBeTruthy();
  }));

  describe('#changeLang()', () => {
    [
      { title: 'dynamic load language', loader: transLoader.dynamicLoader },
      { title: 'static load language', loader: transLoader.staticLoader },
    ].forEach(loaderMethodItem => {
      describe(loaderMethodItem.title, () => {
        let service: NbTransService;

        beforeEach(async () => {
          TestBed.configureTestingModule({
            imports: [NbTransTestingModule],
            providers: [
              { provide: NB_TRANS_DEFAULT_LANG, useValue: NbTransLangEnum.ZH_CN, },
              { provide: NB_TRANS_LOADER, useValue: loaderMethodItem.loader },
            ]
          });
          service = TestBed.inject(NbTransService);
        });

        it('#subscribeLoadDefaultOver()', (done) => {
          service.subscribeLoadDefaultOver().pipe(
            take(1),
          ).subscribe(
            result => {
              expect(result).toEqual(true);
              done();
            }
          );
        });

        [
          { lang: NbTransLangEnum.ZH_CN, expect: { changeResult: { curLang: NbTransLangEnum.ZH_CN, result: true }, transResult: '标题  ' } },
          { lang: NbTransLangEnum.EN, expect: { changeResult: { curLang: NbTransLangEnum.EN, result: true }, transResult: 'title  ' } },
          { lang: NbTransLangEnum.AR_EG, expect: { changeResult: { curLang: NbTransLangEnum.ZH_CN, result: false }, transResult: '标题  ' } },
        ].forEach(item => {
          it(`change lang as ${item.lang}`, (done) => {
            service.subscribeLoadDefaultOver().pipe(
              filter(result => result),
              switchMap(() => service.changeLang(item.lang))
            ).pipe().subscribe(result => {
              expect(result).toEqual(item.expect.changeResult);
              expect(service.lang).toEqual(item.expect.changeResult.curLang);
              expect(service.translationSync('title')).toEqual(item.expect.transResult);
              done();
            });
          });

        });

        describe('#subscribeLangChange()', () => {
          [
            { lang: NbTransLangEnum.ZH_CN, expect: NbTransLangEnum.ZH_CN },
            { lang: NbTransLangEnum.EN, expect: NbTransLangEnum.EN },
            { lang: NbTransLangEnum.AR_EG, expect: NbTransLangEnum.ZH_CN },
          ].forEach(item => {
            it(`change lang as ${item.lang}`, (done) => {
              service.subscribeLoadDefaultOver().pipe(
                filter(result => result),
                switchMap(() => service.changeLang(item.lang)),
              ).subscribe(() => {
                service.subscribeLangChange().pipe().subscribe(lang => {
                  expect(lang).toEqual(item.expect);
                  done();
                });
              });
            });

          });
        });

      });
    });
  });

  it('#changeLangSync()', inject([NbTransService], (service: NbTransService) => {
    spyOn(service, 'changeLang').and.callThrough();
    service.changeLangSync(NbTransLangEnum.BG_BG);
    expect(service.changeLang).toHaveBeenCalledTimes(1);
  }));

  describe('#translationSync()', () => {
    let service: NbTransService;
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [NbTransTestingModule],
        providers: [
          { provide: NB_TRANS_DEFAULT_LANG, useValue: NbTransLangEnum.ZH_CN },
          { provide: NB_TRANS_LOADER, useValue: transLoader.staticLoader },
        ]
      });
      service = TestBed.inject(NbTransService);
    });

    translationSyncTestData.forEach(item => {
      it(item.title, (done) => {
        service.subscribeLoadDefaultOver().pipe(
          filter(result => result),
          take(1),
        ).subscribe(
          () => {
            const result = service.translationSync(item.test.key, item.test.options);
            expect(result).toEqual(item.expect.result);
            done();
          }
        );
      });
    });
  });

  describe('#translationAsync()', () => {
    let service: NbTransService;
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [NbTransTestingModule],
        providers: [
          { provide: NB_TRANS_DEFAULT_LANG, useValue: NbTransLangEnum.ZH_CN },
          { provide: NB_TRANS_LOADER, useValue: transLoader.dynamicLoader },
        ]
      });
      service = TestBed.inject(NbTransService);
    });

    it('not change lang', (done) => {
      service.subscribeLoadDefaultOver().pipe(
        filter(result => result),
        switchMap(() => service.translationAsync('title')),
      ).pipe(take(1)).subscribe(transContent => {
        expect(transContent).toEqual('标题  ');
        done();
      });
    });

    it('change lang as en', (done) => {
      service.subscribeLoadDefaultOver().pipe(
        filter(result => result),
        switchMap(() => service.changeLang(NbTransLangEnum.EN)),
        switchMap(() => service.translationAsync('title')),
      ).pipe(take(1)).subscribe(transContent => {
        expect(transContent).toEqual('title  ');
        done();
      });
    });
  });

  it('when failure to load default lang', (done) => {
    const langLoader = () => Promise.reject();
    const transLoader = {
      [NbTransLangEnum.EN_US]: langLoader
    };
    TestBed.configureTestingModule({
      imports: [NbTransTestingModule],
      providers: [
        { provide: NB_TRANS_DEFAULT_LANG, useValue: NbTransLangEnum.EN_US },
        { provide: NB_TRANS_LOADER, useValue: transLoader },
        { provide: NB_TRANS_MAX_RETRY_TOKEN, useValue: 3 },
      ]
    });
    spyOn(transLoader, NbTransLangEnum.EN_US).and.callThrough();
    const service = TestBed.inject(NbTransService);
    service.subscribeLoadDefaultOver().pipe(
      take(1),
    ).subscribe(_ => {
      expect(transLoader[NbTransLangEnum.EN_US]).toHaveBeenCalledTimes(4);
      done();
    });
  });

  it('#getBrowserLang()', inject([NbTransService], (service: NbTransService) => {
    expect(service.getBrowserLang()).toEqual(window.navigator.language);

    spyOnProperty(window.navigator, 'language').and.returnValue(undefined);
    expect(service.getBrowserLang()).toEqual(undefined);

    spyOnProperty(window, 'navigator').and.returnValue(undefined);
    expect(service.getBrowserLang()).toEqual(undefined);
  }));

  it('#getBrowserLangs()', inject([NbTransService], (service: NbTransService) => {
    expect(service.getBrowserLangs()).toEqual(window.navigator.languages);

    spyOnProperty(window.navigator, 'languages').and.returnValue(undefined);
    expect(service.getBrowserLangs()).toEqual(undefined);

    spyOnProperty(window, 'navigator').and.returnValue(undefined);
    expect(service.getBrowserLangs()).toEqual(undefined);
  }));

});
