import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { NbTransModule } from 'nb-trans';

@Component({
  standalone: true,
  imports: [NbTransModule, CommonModule],
  selector: 'app-feature2',
  templateUrl: './feature2.component.html',
  styleUrls: ['./feature2.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Feature2Component implements OnInit {

  params = {
    params1: '{{params2}}',
    params2: '1111',
    params3: '2222',
  };

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

  constructor() { }

  ngOnInit() {
  }

}


export const routes: Route[] = [{ path: '', component: Feature2Component }];