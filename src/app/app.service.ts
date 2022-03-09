import { NbTransService } from 'nb-trans';

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService implements Resolve<Boolean> {

  constructor(
    private transService: NbTransService
  ) { }

  resolve(): Promise<boolean> {
    return this.transService.subscribeLoadDefaultOver().toPromise();
  }

}
