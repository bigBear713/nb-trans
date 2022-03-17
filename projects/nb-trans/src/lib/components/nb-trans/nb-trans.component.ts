import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { INbTransOptions, INbTransParams, INbTransSentencePart } from '../../models';
import { NbTransService, NbTransToolsService } from '../../services';
import { NbTransSentenceItemEnum } from '../../constants';

@Component({
  selector: 'nb-trans',
  templateUrl: './nb-trans.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbTransComponent implements OnChanges, OnDestroy {

  @Input() components: TemplateRef<{ content: string | TemplateRef<any>; list?: INbTransSentencePart[] }>[] = [];

  @Input() key: string = '';

  @Input() options: INbTransOptions = {};

  params: INbTransParams | undefined;

  sentenceList: INbTransSentencePart[] = [];

  SentenceItemEnum = NbTransSentenceItemEnum;

  private destroy$ = new Subject<void>();

  private originTrans: string = '';

  constructor(
    private changeDR: ChangeDetectorRef,
    private transToolsService: NbTransToolsService,
    private transService: NbTransService,
  ) {
    this.subscribeLangChange();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { key, options } = changes;
    if (key || options) {
      this.originTrans = this.transService.translationSync(this.key, this.options);
      this.reRender();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private reRender(): void {
    this.params = this.options?.params;

    const trans = this.originTrans;
    this.sentenceList = this.transToolsService.handleTrans(trans);

    this.changeDR.markForCheck();
  }

  private subscribeLangChange(): void {
    this.transService.subscribeLangChange().pipe(
      switchMap(_ => this.transService.translationAsync(this.key, this.options)),
      takeUntil(this.destroy$)
    ).subscribe(latestValue => {
      this.originTrans = latestValue;
      this.reRender();
    });
  }

}
