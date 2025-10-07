import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { switchMap, take } from 'rxjs/operators';
import { NB_TRANS_LOADER, NB_TRANS_DEFAULT_LANG, NbTransLang } from '../../constants';
import { INbTransOptions } from '../../models';
import { NbTransService } from '../../services';
import { translationSyncTestData, transLoader, NbTransTestingModule } from '../../testing';
import { NbTransPipe } from '../nb-trans.pipe';
import { isEqual } from 'lodash-es';

describe('Pipe: NbTrans', () => {
  describe('used in normal component', () => {
    let pipe: NbTransPipe;
    let transService: NbTransService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [CommonModule, NbTransTestingModule],
        declarations: [],
        providers: [
          {
            provide: ChangeDetectorRef,
            useValue: jasmine.createSpyObj(ChangeDetectorRef, ['markForCheck']),
          },
          { provide: NB_TRANS_DEFAULT_LANG, useValue: NbTransLang.ZH_CN },
          { provide: NB_TRANS_LOADER, useValue: transLoader.dynamicLoader },
          NbTransService,
        ],
      }).compileComponents();
    });

    beforeEach(() => {
      pipe = TestBed.runInInjectionContext(() => new NbTransPipe());
      transService = TestBed.inject(NbTransService);
    });

    beforeEach(async () => {
      await transService.subscribeLoadDefaultOver().toPromise();
    });

    it('create an instance', () => {
      expect(pipe).toBeTruthy();
    });

    describe('#transform()', () => {
      translationSyncTestData
        .map(item => {
          const expect = {
            resultZHCN: item.expect.result,
            resultEN: item.expect.result,
          };
          // This test data can get right result, so the result has to be handled with Chinese and English
          if (isEqual({ key: 'helloWorld', options: { prefix: 'content' } }, item.test)) {
            expect.resultEN = 'hello world';
            expect.resultZHCN = '你好，世界';
          }
          return {
            ...item,
            expect,
          };
        })
        .forEach(item => {
          it(item.title, done => {
            const verifyResult = (expectResult: string) => {
              const result = pipe.transform(item.test.key, item.test.options);
              expect(result).toEqual(expectResult);
            };
            verifyResult(item.expect.resultZHCN);

            transService
              .changeLang(NbTransLang.EN)
              .pipe(take(1))
              .subscribe(() => {
                verifyResult(item.expect.resultEN);
                done();
              });
          });
        });
    });

    it('#ngOnDestroy()', done => {
      transService
        .changeLang(NbTransLang.EN)
        .pipe(
          switchMap(() => {
            pipe.ngOnDestroy();
            spyOn(transService, 'translationAsync').and.callThrough();
            return transService.changeLang(NbTransLang.ZH_CN);
          }),
          take(1)
        )
        .subscribe(() => {
          expect(transService.translationAsync).toHaveBeenCalledTimes(0);
          done();
        });
    });

    it('verify the trans text will be updated when options has been updated', () => {
      let options: INbTransOptions = { prefix: 'content' };
      const result1 = pipe.transform('helloWorld', options);
      expect(result1).toEqual('你好，世界');

      options = { prefix: undefined };
      const result2 = pipe.transform('helloWorld', options);
      expect(result2).toEqual('你好，世界!');
    });

    it('verify the trans text will be updated when key has been updated', () => {
      const result1 = pipe.transform('content.helloWorld');
      expect(result1).toEqual('你好，世界');

      const result2 = pipe.transform('helloWorld');
      expect(result2).toEqual('你好，世界!');
    });
  });

  describe('used in standalone component', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [
          { provide: NB_TRANS_DEFAULT_LANG, useValue: NbTransLang.ZH_CN },
          { provide: NB_TRANS_LOADER, useValue: transLoader.staticLoader },
        ],
      }).compileComponents();
      const transService = TestBed.inject(NbTransService);
      await transService.subscribeLoadDefaultOver().toPromise();
    });

    [
      {
        title: 'imported by standalone component',
        createComp: () => TestBed.createComponent(StandaloneComponent),
      },
      {
        title: 'imported by ngModule',
        createComp: () => TestBed.createComponent(StandaloneComponentWithNgModule),
      },
    ].forEach(item => {
      it(item.title, () => {
        const fixture = item.createComp();
        const component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component.textContent).toEqual('你好，世界');
      });
    });
  });
});

const StandaloneCompConfig = {
  standalone: true,
  imports: [NbTransPipe],
  template: `{{key|nbTrans:options}}`,
};

@Component(StandaloneCompConfig)
class StandaloneComponent {
  private elementRef: ElementRef<HTMLDivElement> = inject(ElementRef<HTMLDivElement>);
  key = 'helloWorld';
  options: INbTransOptions = { prefix: 'content' };

  get textContent() {
    return this.elementRef.nativeElement.textContent?.trim();
  }
}

@Component({
  ...StandaloneCompConfig,
  imports: [NbTransTestingModule],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
class StandaloneComponentWithNgModule extends StandaloneComponent {}
