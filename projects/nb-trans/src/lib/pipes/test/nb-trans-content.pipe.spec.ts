import { Component, ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NbTransToolsService } from '../../services';
import { handleSentenceWithParamsTestData, NbTransTestingModule } from '../../testing';
import { NbTransContentPipe } from '../nb-trans-content.pipe';

describe('Pipe: NbTransContente', () => {
  describe('used in normal case', () => {
    let pipe: NbTransContentPipe;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [NbTransTestingModule],
        declarations: []
      })
        .compileComponents();
    });

    beforeEach(() => {
      const transToolsService = TestBed.inject(NbTransToolsService);
      pipe = new NbTransContentPipe(transToolsService)
    });

    it('create an instance', () => {
      expect(pipe).toBeTruthy();
    });

    describe('#transform()', () => {
      handleSentenceWithParamsTestData.forEach(item => {
        it(item.title, () => {
          const result = pipe.transform(item.test.trans, item.test.params);
          expect(result).toEqual(item.expect.result);
        });
      });
    });
  });

  describe('used in standalone component', () => {
    [
      {
        title: 'imported by standalone component',
        createComp: () => TestBed.createComponent(StandaloneComponent)
      },
    ].forEach(item => {
      it(item.title, () => {
        const fixture = item.createComp();
        const component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component.textContent).toEqual(handleSentenceWithParamsTestData[0].expect.result);
      });
    })
  });

});

const StandaloneCompConfig = {
  standalone: true,
  imports: [NbTransContentPipe],
  template: `{{trans|nbTransContent:params}}`,
};

@Component(StandaloneCompConfig)
class StandaloneComponent {
  trans = handleSentenceWithParamsTestData[0].test.trans;
  params = handleSentenceWithParamsTestData[0].test.params;

  get textContent() {
    return this.elementRef.nativeElement.textContent?.trim();
  }

  constructor(private elementRef: ElementRef<HTMLDivElement>) { }
}
