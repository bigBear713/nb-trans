import { NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { NbIsStringPipe, NbTplContentPipe } from '@bigbear713/nb-common';
import { INbTransSentencePart } from '../../models';

const importsFromNgCommon = [NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet];
const importsFromNbCommon = [NbIsStringPipe, NbTplContentPipe];

@Component({
  standalone: true,
  imports: [...importsFromNgCommon, ...importsFromNbCommon],
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[nb-trans-subcontent]',
  template: `
    <ng-container [ngSwitch]="content | nbIsString">
      <ng-container *ngSwitchCase="true">{{ content }}</ng-container>
      <ng-container
        *ngSwitchDefault
        [ngTemplateOutlet]="content | nbTplContent"
        [ngTemplateOutletContext]="{ list: subcontentList }" />
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbTransSubcontentComponent {
  @Input({ alias: 'nb-trans-subcontent', required: true })
  content: string | TemplateRef<unknown> = '';

  @Input() subcontentList: INbTransSentencePart[] = [];
}
