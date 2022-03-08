import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbCommonModule } from '@bigbear713/nb-common';
import { NbTransComponent, NbTransSubcontentComponent } from './components';
import { NbSentenceItemTypePipe, NbTransContentPipe, NbTransPipe } from './pipes';

const COMPONENTS = [
  NbTransComponent,
  NbTransSubcontentComponent,
];

const PIPES = [
  NbTransPipe,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES,
    NbTransContentPipe,
    NbSentenceItemTypePipe,
  ],
  imports: [
    CommonModule,
    NbCommonModule,
  ],
  exports: [
    ...COMPONENTS,
    ...PIPES,
  ]
})
export class NbTransModule { }
