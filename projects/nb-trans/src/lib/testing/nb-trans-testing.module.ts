import { NgModule } from "@angular/core";
import { NbTransModule } from "../nb-trans.module";
import { NbTransService, NbTransToolsService } from "../services";

@NgModule({
  providers: [
    NbTransService,
    NbTransToolsService
  ],
  exports: [NbTransModule]
})
export class NbTransTestingModule { }