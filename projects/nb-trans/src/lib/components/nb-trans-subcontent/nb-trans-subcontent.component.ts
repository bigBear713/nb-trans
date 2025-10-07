import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { NbIsStringPipe, NbTplContentPipe } from '@bigbear713/nb-common';
import { INbTransSentencePart } from '../../models';

const importsFromNgCommon = [NgTemplateOutlet];
const importsFromNbCommon = [NbIsStringPipe, NbTplContentPipe];

@Component({
  standalone: true,
  imports: [...importsFromNgCommon, ...importsFromNbCommon],
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[nb-trans-subcontent]',
  template: `
    @switch (content | nbIsString) {
      @case (true) {
        {{ content }}
      }
      @default {
        <ng-container
          [ngTemplateOutlet]="content | nbTplContent"
          [ngTemplateOutletContext]="{ list: subcontentList }" />
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbTransSubcontentComponent {
  @Input({ alias: 'nb-trans-subcontent', required: true })
  content: string | TemplateRef<unknown> = '';

  @Input() subcontentList: INbTransSentencePart[] = [];
}
