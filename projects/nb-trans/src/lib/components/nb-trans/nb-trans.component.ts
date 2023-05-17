import { switchMap } from 'rxjs/operators';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { INbTransOptions, INbTransParams, INbTransSentencePart } from '../../models';
import { NbTransService, NbTransToolsService } from '../../services';
import { NbTransSentenceItem } from '../../constants';
import { NgFor, NgSwitch, NgSwitchCase, NgTemplateOutlet } from '@angular/common';
import { NbSentenceItemTypePipe, NbTransContentPipe } from '../../pipes';
import { NbTplContentPipe, NbUnsubscribeService } from '@bigbear713/nb-common';

const importsFromNgCommon = [NgTemplateOutlet, NgFor, NgSwitch, NgSwitchCase];
const importsFromNbCommon = [NbTplContentPipe];
const importsFromSelf = [NbSentenceItemTypePipe, NbTransContentPipe];

@Component({
  standalone: true,
  imports: [...importsFromNgCommon, ...importsFromNbCommon, ...importsFromSelf],
  selector: 'nb-trans',
  templateUrl: './nb-trans.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NbUnsubscribeService]
})
export class NbTransComponent implements OnChanges {

  @Input() components: TemplateRef<{ content: string | TemplateRef<any>; list?: INbTransSentencePart[] }>[] = [];

  @Input({ required: true }) key: string = '';

  @Input() options: INbTransOptions = {};

  params: INbTransParams | undefined;

  sentenceList: INbTransSentencePart[] = [];

  SentenceItemEnum = NbTransSentenceItem;

  private optionsWithoutParams: INbTransOptions = {};

  private originTrans: string = '';

  constructor(
    private changeDR: ChangeDetectorRef,
    private transToolsService: NbTransToolsService,
    private transService: NbTransService,
    private unsubscribeService: NbUnsubscribeService,
  ) {
    this.subscribeLangChange();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { key, options } = changes;
    if (options) {
      this.updateOptionsWithoutParams();
    }
    if (key || options) {
      this.originTrans = this.transService.translationSync(this.key, this.optionsWithoutParams);
      this.reRender();
    }
  }

  private reRender(): void {
    this.params = this.options?.params;

    const trans = this.originTrans;
    this.sentenceList = this.transToolsService.handleTrans(trans);

    this.changeDR.markForCheck();
  }

  private subscribeLangChange(): void {
    const langChange$ = this.transService.subscribeLangChange().pipe(
      switchMap(_ => this.transService.translationAsync(this.key, this.optionsWithoutParams)),
    );
    this.unsubscribeService.addUnsubscribeOperator(langChange$)
      .subscribe(latestValue => {
        this.originTrans = latestValue;
        this.reRender();
      });
  }

  private updateOptionsWithoutParams() {
    // or origin trans string, the dynamic params don't need to be translated, because they will be translated in sentence item,
    // so here remove the options' params
    this.optionsWithoutParams = {
      ...(this.options || {}),
      params: undefined
    };
  }

}


@Component({
  standalone: true,
  imports: [...importsFromNgCommon, ...importsFromNbCommon, ...importsFromSelf],
  selector: '[nb-trans]',
  templateUrl: './nb-trans.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NbUnsubscribeService]
})
export class NbTrans2Component extends NbTransComponent {

  @Input('nb-trans-components') components: TemplateRef<{ content: string | TemplateRef<any>; list?: INbTransSentencePart[] }>[] = [];

  @Input({ alias: 'nb-trans', required: true }) key: string = '';

  @Input('nb-trans-options') options: INbTransOptions = {};
}