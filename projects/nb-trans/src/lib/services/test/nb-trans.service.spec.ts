import { inject, TestBed } from '@angular/core/testing';
import { filter, switchMap, take } from 'rxjs/operators';
import { NB_TRANS_DEFAULT_LANG, NB_TRANS_LOADER, NB_TRANS_MAX_RETRY, NbTransLang } from '../../constants';
import { translationSyncTestData, transLoader, NbTransTestingModule } from '../../testing';
import { NbTransService } from '../nb-trans.service';
import { NbTransToolsService } from '../nb-trans-tools.service';

describe('Service: NbTrans', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
              { provide: NB_TRANS_DEFAULT_LANG, useValue: NbTransLang.ZH_CN, },
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
          { lang: NbTransLang.ZH_CN, expect: { changeResult: { curLang: NbTransLang.ZH_CN, result: true }, transResult: '标题  ' } },
          { lang: NbTransLang.EN, expect: { changeResult: { curLang: NbTransLang.EN, result: true }, transResult: 'title  ' } },
          { lang: NbTransLang.AR_EG, expect: { changeResult: { curLang: NbTransLang.ZH_CN, result: false }, transResult: '标题  ' } },
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
            { lang: NbTransLang.ZH_CN, expect: NbTransLang.ZH_CN },
            { lang: NbTransLang.EN, expect: NbTransLang.EN },
            { lang: NbTransLang.AR_EG, expect: NbTransLang.ZH_CN },
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
    service.changeLangSync(NbTransLang.BG_BG);
    expect(service.changeLang).toHaveBeenCalledTimes(1);
  }));

  describe('#translationSync()', () => {
    let service: NbTransService;
    let toolService: NbTransToolsService;
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [NbTransTestingModule],
        providers: [
          { provide: NB_TRANS_DEFAULT_LANG, useValue: NbTransLang.ZH_CN },
          { provide: NB_TRANS_LOADER, useValue: transLoader.staticLoader },
        ]
      });
      service = TestBed.inject(NbTransService);
      toolService = TestBed.inject(NbTransToolsService);
    });

    translationSyncTestData.forEach(item => {
      it(item.title, (done) => {
        service.subscribeLoadDefaultOver().pipe(
          filter(isLoadOver => isLoadOver),
          take(1),
        ).subscribe(
          () => {
            spyOn(toolService, 'isTranslatedStringValid').and.callThrough();
            const result = service.translationSync(item.test.key, item.test.options);
            expect(result).toEqual(item.expect.result);
            expect(toolService.isTranslatedStringValid).toHaveBeenCalled();
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
          { provide: NB_TRANS_DEFAULT_LANG, useValue: NbTransLang.ZH_CN },
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
        switchMap(() => service.changeLang(NbTransLang.EN)),
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
      [NbTransLang.EN_US]: langLoader
    };
    TestBed.configureTestingModule({
      imports: [NbTransTestingModule],
      providers: [
        { provide: NB_TRANS_DEFAULT_LANG, useValue: NbTransLang.EN_US },
        { provide: NB_TRANS_LOADER, useValue: transLoader },
        { provide: NB_TRANS_MAX_RETRY, useValue: 3 },
      ]
    });
    spyOn(transLoader, NbTransLang.EN_US).and.callThrough();
    const service = TestBed.inject(NbTransService);
    service.subscribeLoadDefaultOver().pipe(
      take(1),
    ).subscribe(_ => {
      expect(transLoader[NbTransLang.EN_US]).toHaveBeenCalledTimes(4);
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

  it('#NbTransService.getBrowserLang()', () => {
    expect(NbTransService.getBrowserLang()).toEqual(window.navigator.language);

    spyOnProperty(window.navigator, 'language').and.returnValue(undefined);
    expect(NbTransService.getBrowserLang()).toEqual(undefined);

    spyOnProperty(window, 'navigator').and.returnValue(undefined);
    expect(NbTransService.getBrowserLang()).toEqual(undefined);
  });

  it('#getBrowserLangs()', inject([NbTransService], (service: NbTransService) => {
    expect(service.getBrowserLangs()).toEqual(window.navigator.languages);

    spyOnProperty(window.navigator, 'languages').and.returnValue(undefined);
    expect(service.getBrowserLangs()).toEqual(undefined);

    spyOnProperty(window, 'navigator').and.returnValue(undefined);
    expect(service.getBrowserLangs()).toEqual(undefined);
  }));

  it('#NbTransService.getBrowserLangs()', () => {
    expect(NbTransService.getBrowserLangs()).toEqual(window.navigator.languages);

    spyOnProperty(window.navigator, 'languages').and.returnValue(undefined);
    expect(NbTransService.getBrowserLangs()).toEqual(undefined);

    spyOnProperty(window, 'navigator').and.returnValue(undefined);
    expect(NbTransService.getBrowserLangs()).toEqual(undefined);
  });

});
