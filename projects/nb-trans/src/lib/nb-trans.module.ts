import { NgModule } from '@angular/core';
import { NbTrans2Component, NbTransComponent, NbTransSubcontentComponent } from './components';
import { NbTransPipe } from './pipes';

const COMPONENTS = [NbTransComponent, NbTrans2Component, NbTransSubcontentComponent];

const PIPES = [NbTransPipe];

@NgModule({
  imports: [...COMPONENTS, ...PIPES],
  exports: [...COMPONENTS, ...PIPES],
})
export class NbTransModule {}
