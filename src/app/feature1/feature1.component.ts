import { INbTransOptions, NbTransService } from 'nb-trans';
import { Observable } from 'rxjs';

import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';


@Component({
  selector: 'app-feature1',
  templateUrl: './feature1.component.html',
  styleUrls: ['./feature1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Feature1Component implements OnInit {

  title$: Observable<string> | undefined;
  titleWithParams$: Observable<string> | undefined;

  params = {
    params1: '{{params2}}',
    params2: '1111',
    params3: '2222',
    '#p^':'test',
  };

  options: INbTransOptions = {
    prefix: 'content',
    params: this.params,
  };

  get lang() {
    return this.transService.lang;
  }

  get title() {
    return this.transService.translationSync('title');
  }

  compStr1 = `
    <div>
      <nb-trans key="complexContent" [components]="[com0,com1,com2]" [options]="{params,prefix:'content'}"> </nb-trans>
    </div>

    <ng-template #com0 let-comContent="content" let-list="list">
      <b [nb-trans-subcontent]="comContent" [subcontentList]="list"></b>
    </ng-template>

    <ng-template #com1 let-comContent="content" let-list="list">
      <app-widget [comContent]="comContent" [list]="list"></app-widget>
    </ng-template>

    <ng-template #com2 let-comContent="content">
      <b>{{comContent}}</b>
    </ng-template>
  `;

  compStr2 = `
    <div>
      <div nb-trans nb-trans-key="complexContent" [nb-trans-components]="[com0,com1,com2]" [nb-trans-options]="{params,prefix:'content'}"> </div>
    </div>

    <ng-template #com0 let-comContent="content" let-list="list">
      <b [nb-trans-subcontent]="comContent" [subcontentList]="list"></b>
    </ng-template>

    <ng-template #com1 let-comContent="content" let-list="list">
      <app-widget [comContent]="comContent" [list]="list"></app-widget>
    </ng-template>

    <ng-template #com2 let-comContent="content">
      <b>{{comContent}}</b>
    </ng-template>
  `;


  browserLang: string | undefined = '';
  browserLangs: readonly string[] | undefined = [];

  constructor(
    private transService: NbTransService,
  ) { }

  ngOnInit(): void {
    this.title$ = this.transService.translationAsync('title');
    this.titleWithParams$ = this.transService.translationAsync('content.contentWithParams', { params: this.params });
    this.browserLang = NbTransService.getBrowserLang();
    this.browserLangs = NbTransService.getBrowserLangs();
  }

  changeOptions() {
    const prefix = this.options.prefix ? undefined : 'content';
    this.options = { ...this.options, prefix: prefix };
  }

}
