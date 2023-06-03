import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbTransService } from 'nb-trans';
import { Observable } from 'rxjs';
import { GTagService } from './g-tag.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  title$: Observable<string> | undefined;

  params = {
    params1: '{{params2}}',
    params2: '1111',
    params3: '2222',
  };

  links = [
    {
      title: 'Changelog',
      link: 'https://github.com/bigBear713/nb-trans/blob/main/CHANGELOG.md',
    },
    {
      title: 'Document',
      link: 'https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.md',
    }
  ];

  get title() {
    return this.transService.translationSync('title');
  }

  get lang(): string {
    return this.transService.lang;
  }

  constructor(
    private gtagService: GTagService,
    private transService: NbTransService,
  ) { }

  ngOnInit(): void {
    this.title$ = this.transService.translationAsync('title');
  }

  go2Link(target: { title: string, link: string }): void {
    this.gtagService.trackLink({
      link_name: target.title,
      link: target.link,
    });
  }

  onChangeLang(lang: string): void {
    this.transService.changeLang(lang).subscribe(result => {
      console.log(result);
      if (!result.result) {
        alert('切换语言失败，没有导入该语言包,当前语言是:' + result.curLang);
      }
      this.gtagService.trackButton({
        button_name: 'zh-CN' === lang ? '切换为中文' : ('en' === lang ? '切换为英文' : '切换为其它不存在的语言'),
        language: result.curLang,
      });
    });
  }

}
