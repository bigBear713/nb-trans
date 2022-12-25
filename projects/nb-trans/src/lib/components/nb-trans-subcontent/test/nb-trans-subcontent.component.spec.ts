import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbTransTestingModule } from '../../../testing';
import { NbTransSubcontentComponent } from '../nb-trans-subcontent.component';

@Component({
  selector: 'mock-tpl-ref',
  template: `
    <ng-template #tplRef>{{content}}</ng-template>

    <ng-template #tplRefWithList let-list="list">
      <p *ngFor="let item of list">{{item}}</p>
    </ng-template>
  `,
})
export class MockTplRefComponent {
  @ViewChild('tplRef') tplRef!: TemplateRef<any>;
  @ViewChild('tplRefWithList') tplRefWithList!: TemplateRef<any>;

  content = 'mock templateRef content';
}

describe('Component: NbTransSubcontent', () => {
  let component: NbTransSubcontentComponent;
  let fixture: ComponentFixture<NbTransSubcontentComponent>;
  let hostEle: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NbTransTestingModule],
      declarations: [MockTplRefComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NbTransSubcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    hostEle = fixture.debugElement.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('the content is a string value', () => {
    const content = 'test content';
    component.content = content;

    detectChanges();

    expect(hostEle.textContent?.trim()).toEqual(content);
  });

  it('the content is a templateRef type value', () => {
    const mockTplRefFixture = TestBed.createComponent(MockTplRefComponent);
    const mockTplRefComp = mockTplRefFixture.componentInstance;
    mockTplRefFixture.detectChanges();

    const content = mockTplRefComp.tplRef;
    component.content = content;

    detectChanges();

    expect(hostEle.textContent?.trim()).toEqual(mockTplRefComp.content);
  });

  it('the content is a templateRef type value with string list param', () => {
    const mockList = ['mock list 1', 'mock list 2'];

    const mockTplRefFixture = TestBed.createComponent(MockTplRefComponent);
    const mockTplRefComp = mockTplRefFixture.componentInstance;
    mockTplRefFixture.detectChanges();

    const content = mockTplRefComp.tplRefWithList;
    component.content = content;
    component.subcontentList = mockList;

    detectChanges();

    const listFromDom = Array.from(hostEle.querySelectorAll('p')).map(item => item.textContent?.trim());
    expect(listFromDom).toEqual(mockList);
  });

  function detectChanges() {
    const changeDR = fixture.componentRef.injector.get(ChangeDetectorRef);
    changeDR.markForCheck();
    fixture.detectChanges();
  }
});
