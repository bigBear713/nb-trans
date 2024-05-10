import { switchMap } from 'rxjs/operators';
import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { INbTransOptions } from '../models';
import { NbTransService } from '../services';
import { isEqual } from 'lodash-es';
import { NbUnsubscribeService } from '@bigbear713/nb-common';

@Pipe({ standalone: true, name: 'nbTrans', pure: false })
export class NbTransPipe implements PipeTransform, OnDestroy {
  private latestValue: string = '';

  private key: string = '';

  private options: INbTransOptions | undefined;

  private unsubscribeService: NbUnsubscribeService;

  constructor(
    private changeDR: ChangeDetectorRef,
    private transService: NbTransService
  ) {
    this.unsubscribeService = new NbUnsubscribeService();
    this.subscribeLangChange();
  }

  transform(key: string, options?: INbTransOptions): string {
    const shouldUpdate = !this.latestValue || key !== this.key || !isEqual(options, this.options);
    if (shouldUpdate) {
      this.latestValue = this.transService.translationSync(key, options);

      this.key = key;
      this.options = options;
    }

    return this.latestValue;
  }

  ngOnDestroy(): void {
    this.unsubscribeService.ngOnDestroy();
  }

  private subscribeLangChange(): void {
    const langChange$ = this.transService
      .subscribeLangChange()
      .pipe(switchMap(() => this.transService.translationAsync(this.key, this.options)));
    this.unsubscribeService
      .addUnsubscribeOperator(langChange$)
      .subscribe(latestValue => this.updateLatestValue(latestValue));
  }

  private updateLatestValue(latestValue: string): void {
    this.latestValue = latestValue;
    this.changeDR.markForCheck();
  }
}
