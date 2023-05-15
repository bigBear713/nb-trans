import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { INbTransSentencePart } from 'nb-trans';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetComponent implements OnInit {

  @Input()
  comContent: string | TemplateRef<any> = '';

  @Input() list: INbTransSentencePart[] = [];

  constructor() { }

  ngOnInit() {
  }

}
