import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { INbTransSentencePart } from 'nb-trans';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
})
export class WidgetComponent implements OnInit {
  @Input()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  comContent: string | TemplateRef<any> = '';

  @Input() list: INbTransSentencePart[] = [];

  constructor() {}

  ngOnInit() {}
}
