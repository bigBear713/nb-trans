import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NbTransLangEnum, NbTransModule, NB_TRANS_DEFAULT_LANG, NB_TRANS_LOADER } from 'nb-trans';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NbTransModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    // {
    //   provide: NG_TRANS_MAX_RETRY_TOKEN,
    //   useValue: 0
    // },
    {
      provide: NB_TRANS_DEFAULT_LANG,
      useValue: NbTransLangEnum.ZH_CN,
    },
    // {
    //   provide: NG_TRANS_LOADER,
    //   useValue: {
    //     // dyn load and the content is a ts file
    //     [NgTransLangEnum.EN]: () => import('./localization/en/translations').then(data => data.trans),
    //     [NgTransLangEnum.ZH_CN]: () => import('./localization/zh-CN/translations').then(data => data.trans),
    //     // direct load
    //     // [NgTransLangEnum.ZH_CN]: trans,
    //   },
    // },
    {
      provide: NB_TRANS_LOADER,
      useFactory: (http: HttpClient) => ({
        // https://github.com/ngx-translate/core/issues/1207#issuecomment-673921899
        // it is expecting to get the translation file using HTTP via absolute URL when angualr SSR.
        // So here change the file's path as relative/absolute via environment

        // dyn load and the content is a json file
        // [NgTransLangEnum.EN]: () => http.get('./assets/localization/en/translations.json').toPromise(),
        [NbTransLangEnum.EN]: () => http.get(environment.domain + 'assets/localization/en/translations.json'),
        // [NgTransLangEnum.ZH_CN]: () => http.get('./assets/localization/zh-CN/translations.json').toPromise(),
        [NbTransLangEnum.ZH_CN]: () => http.get(environment.domain + 'assets/localization/zh-CN/translations.json'),
      }),
      deps: [HttpClient]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
