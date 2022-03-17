import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef
} from '@angular/core';
import { INbTransSentencePart } from '../../models';

@Component({
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
