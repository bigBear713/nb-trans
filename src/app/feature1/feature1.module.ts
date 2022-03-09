import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { Feature1Component } from './feature1.component';
import { Feature1RoutingModule } from './feature1.routing.module';
import { WidgetComponent } from './widget/widget.component';
import { NbTransModule } from 'nb-trans';

@NgModule({
  imports: [
    CommonModule,
    NbTransModule,
    Feature1RoutingModule
  ],
  declarations: [Feature1Component, WidgetComponent]
})
export class Feature1Module { }
