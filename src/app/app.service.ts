import { NbTransService } from 'nb-trans';

import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private transService: NbTransService
  ) { }

  resolve(): Promise<boolean> {
    return lastValueFrom(this.transService.subscribeLoadDefaultOver());
  }

}
