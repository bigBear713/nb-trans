import { NgModule } from "@angular/core";
import { NbTransModule } from "../nb-trans.module";
import { NbTransService } from "../services";

@NgModule({
  providers: [
    NbTransService
  ],
  exports: [NbTransModule]
})
export class NgTransTestingModule { }