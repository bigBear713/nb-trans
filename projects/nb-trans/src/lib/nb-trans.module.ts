import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbCommonModule } from '@bigbear713/nb-common';
import { NbSentenceItemTypePipe, NbTransContentPipe, NbTransPipe } from './pipes';


const PIPES = [
  NbTransPipe,
];

@NgModule({
  declarations: [
    ...PIPES,
    NbTransContentPipe,
    NbSentenceItemTypePipe,
  ],
  imports: [
    CommonModule,
    NbCommonModule,
  ],
  exports: [
    ...PIPES,
  ]
})
export class NbTransModule { }
