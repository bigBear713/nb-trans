import { Component, SimpleChange, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';
import { NB_TRANS_DEFAULT_LANG, NB_TRANS_LOADER } from '../../../constants';
import { NbTransLang } from '../../../constants';
import { INbTransOptions } from '../../../models';
import { NbTransService, NbTransToolsService } from '../../../services';
import { transLoader, NbTransTestingModule } from '../../../testing';
import { NbTransComponent } from '../nb-trans.component';

@Component({
  selector: 'comp1',
  template: `
    <ng-content></ng-content>
  `,
})
export class MockComp1Component {
}

@Component({
  selector: 'mock-tpl-ref',
  template: `
    <ng-template #tpl1 let-content="content" let-list="list">
      <div class="has-subcontent" [nb-trans-subcontent]="content" [subcontentList]="list"></div>
    </ng-template>
    <ng-template #tpl2 let-content="content"><comp1>{{content}}</comp1></ng-template>
  `,
})
export class MockTplRefComponent {
  @ViewChild('tpl1') tpl1!: TemplateRef<any>;
  @ViewChild('tpl2') tpl2!: TemplateRef<any>;
}

describe('Component: NbTrans', () => {
  describe('used in normal component', () => {
    let component: NbTransComponent;
    let fixture: ComponentFixture<NbTransComponent>;
    let transToolsService: NbTransToolsService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [NbTransTestingModule],
        declarations: [MockTplRefComponent, MockComp1Component],
        providers: [
          { provide: NB_TRANS_LOADER, useValue: transLoader.staticLoader },
        ]
      })
        .compileComponents();
    });

    beforeEach(() => {
      transToolsService = TestBed.inject(NbTransToolsService);

      fixture = TestBed.createComponent(NbTransComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    describe('#ngOnChanges()', () => {
      it('key param and options param all have values', () => {
        const spyFn = spyOn(transToolsService, 'handleTrans').and.callThrough();

        component.key = 'title';
        component.options = {};
        const changes = {
          key: new SimpleChange(undefined, component.key, true),
          options: new SimpleChange(undefined, component.options, true),
        };
        component.ngOnChanges(changes);

        expect(spyFn).toHaveBeenCalledTimes(1);
      });

      it('only key param has value', () => {
        const spyFn = spyOn(transToolsService, 'handleTrans').and.callThrough();

        component.key = 'title';
        component.options = undefined as any;
        const changes = {
          key: new SimpleChange(undefined, component.key, true),
          options: new SimpleChange(undefined, component.options, true)
        };
        component.ngOnChanges(changes);

        expect(spyFn).toHaveBeenCalledTimes(1);
      });

      it('only option param has value', () => {
        const spyFn = spyOn(transToolsService, 'handleTrans').and.callThrough();

        component.key = 'title';
        component.options = {};
        const changes = {
          options: new SimpleChange(undefined, component.options, true),
        };
        component.ngOnChanges(changes);

        expect(spyFn).toHaveBeenCalledTimes(1);
      });
    });

    it('verify has subscribed lang change event', (done) => {
      const transService = TestBed.inject(NbTransService);
      spyOn(transService, 'subscribeLangChange').and.callThrough();
      spyOn(transToolsService, 'handleTrans').and.callThrough();

      component.key = 'title';
      component.options = {};

      transService.changeLang(NbTransLang.EN).pipe(take(1)).subscribe(() => {
        expect(transToolsService.handleTrans).toHaveBeenCalledTimes(1);
        done();
      });

    });

    describe('verify the UI', () => {
      let tpls: TemplateRef<any>[] = [];
      let uiComp: NbTransComponent;
      let uiFixture: ComponentFixture<NbTransComponent>;
      let hostEle: HTMLElement;

      beforeEach(() => {
        const tplFixture = TestBed.createComponent(MockTplRefComponent);
        const tplComp = tplFixture.componentInstance;
        tplFixture.detectChanges();
        tpls = [tplComp.tpl1, tplComp.tpl2];

        uiFixture = TestBed.createComponent(NbTransComponent);
        uiComp = uiFixture.componentInstance;
        uiFixture.detectChanges();
        hostEle = uiFixture.debugElement.nativeElement;
      });

      beforeEach(async () => {
        const transService = TestBed.inject(NbTransService);
        return transService.subscribeLoadDefaultOver().toPromise();
      });

      it(`the content is string`, () => {
        uiComp.key = 'title';
        uiComp.components = [];
        const changes = {
          key: new SimpleChange(undefined, uiComp.key, true),
        };
        uiComp.ngOnChanges(changes);
        uiFixture.detectChanges();

        expect(hostEle.textContent?.trim()).toEqual('标题');
      });

      it(`the content is component`, () => {
        uiComp.key = 'component';
        uiComp.components = [tpls[1]];
        const changes = {
          key: new SimpleChange(undefined, uiComp.key, true),
        };
        uiComp.ngOnChanges(changes);
        uiFixture.detectChanges();

        const comp1Instance = hostEle.querySelector('comp1');
        expect(!!comp1Instance).toEqual(true);
        expect(comp1Instance?.textContent?.trim()).toEqual('组件');
      });

      it(`the content is complex component`, () => {
        uiComp.key = 'complexComponent';
        uiComp.components = tpls;
        const changes = {
          key: new SimpleChange(undefined, uiComp.key, true),
        };
        uiComp.ngOnChanges(changes);
        uiFixture.detectChanges();

        const hasSubContentEle = hostEle.querySelector('div.has-subcontent');
        expect(!!hasSubContentEle).toEqual(true);
        expect(hasSubContentEle?.textContent?.trim()).toEqual('组件0组件1');

        const comp1Instance = hasSubContentEle?.querySelector('comp1');
        expect(!!comp1Instance).toEqual(true);
        expect(comp1Instance?.textContent?.trim()).toEqual('组件1');
      });

    });
  });

  describe('used in standalone component', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [
          { provide: NB_TRANS_DEFAULT_LANG, useValue: NbTransLang.ZH_CN, },
          { provide: NB_TRANS_LOADER, useValue: transLoader.staticLoader },
        ]
      })
        .compileComponents();
      const transService = TestBed.inject(NbTransService);
      await transService.subscribeLoadDefaultOver().toPromise();
    });

    [
      {
        title: 'imported by standalone component',
        createComp: () => TestBed.createComponent(StandaloneComponent)
      },
      {
        title: 'imported by ngModule',
        createComp: () => TestBed.createComponent(StandaloneComponentWithNgModule)
      }
    ].forEach(item => {
      it(item.title, () => {
        const fixture = item.createComp();
        const component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component.textContent).toEqual('你好，世界');
      });
    })
  });

});

const StandaloneCompConfig = {
  standalone: true,
  imports: [NbTransComponent],
  template: `<nb-trans [key]="key" [options]="options"></nb-trans>`,
};

@Component(StandaloneCompConfig)
class StandaloneComponent {
  key = 'helloWorld';
  options: INbTransOptions = { prefix: 'content' };

  get textContent() {
    return this.elementRef.nativeElement.textContent?.trim();
  }

  constructor(private elementRef: ElementRef<HTMLDivElement>) { }
}

@Component({
  ...StandaloneCompConfig,
  imports: [NbTransTestingModule],
})
class StandaloneComponentWithNgModule extends StandaloneComponent { }