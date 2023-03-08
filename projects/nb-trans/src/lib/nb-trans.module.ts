import { NgModule } from '@angular/core';
import { NbTransComponent, NbTransSubcontentComponent } from './components';
import { NbTransPipe } from './pipes';

const COMPONENTS = [
  NbTransComponent,
  NbTransSubcontentComponent,
];

const PIPES = [
  NbTransPipe,
];

@NgModule({
  imports: [...COMPONENTS, ...PIPES],
  exports: [...COMPONENTS, ...PIPES]
})
export class NbTransModule { }
