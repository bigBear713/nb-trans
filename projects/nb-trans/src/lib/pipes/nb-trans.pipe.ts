import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { INbTransOptions } from '../models';
import { NbTransService } from '../services';
import { isEqual } from 'lodash-es';

@Pipe({ standalone: true, name: 'nbTrans', pure: false })
export class NbTransPipe implements PipeTransform, OnDestroy {

  private latestValue: string = '';

  private destroy$ = new Subject<void>();

  private key: string = '';

  private options: INbTransOptions | undefined;

  constructor(
    private changeDR: ChangeDetectorRef,
    private transService: NbTransService,
  ) {
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
    this.destroy$.next();
    this.destroy$.complete();
  }

  private subscribeLangChange(): void {
    this.transService.subscribeLangChange().pipe(
      switchMap(_ => this.transService.translationAsync(this.key, this.options)),
      takeUntil(this.destroy$)
    ).subscribe(latestValue => this.updateLatestValue(latestValue));
  }

  private updateLatestValue(latestValue: string): void {
    this.latestValue = latestValue;
    this.changeDR.markForCheck();
  }
}
