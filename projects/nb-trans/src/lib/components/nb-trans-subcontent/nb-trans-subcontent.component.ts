import { NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef
} from '@angular/core';
import { NbIsStringPipe, NbTplContentPipe } from '@bigbear713/nb-common';
import { INbTransSentencePart } from '../../models';

const importsFromNgCommon = [NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet];
const importsFromNbCommon = [NbIsStringPipe, NbTplContentPipe];

@Component({
  standalone: true,
  imports: [...importsFromNgCommon, ...importsFromNbCommon],
  selector: '[nb-trans-subcontent]',
  template: `
    <ng-container [ngSwitch]="content | nbIsString">
      <ng-container *ngSwitchCase="true">{{content}}</ng-container>
      <ng-container *ngSwitchDefault
                    [ngTemplateOutlet]="content | nbTplContent" 
                    [ngTemplateOutletContext]="{ list: subcontentList }"></ng-container>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbTransSubcontentComponent {
  @Input('nb-trans-subcontent') content: string | TemplateRef<any> = '';

  @Input() subcontentList: INbTransSentencePart[] = [];
}
