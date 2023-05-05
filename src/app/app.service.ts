import { NbTransService } from 'nb-trans';

import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AppService  {

  constructor(
    private transService: NbTransService
  ) { }

  resolve(): Promise<boolean> {
    return this.transService.subscribeLoadDefaultOver().toPromise();
  }

}
