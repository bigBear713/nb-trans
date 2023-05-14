import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NbTransLang, NbTransModule, NB_TRANS_DEFAULT_LANG, NB_TRANS_LOADER, NB_TRANS_MAX_RETRY, NB_TRANS_PARAM_KEY_INVALID_WARNING } from 'nb-trans';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    NbTransModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    // {
    //   provide: NB_TRANS_MAX_RETRY,
    //   useValue: 0
    // },
    {
      provide: NB_TRANS_DEFAULT_LANG,
      useValue: NbTransLang.ZH_CN,
    },
    // {
    //   provide: NB_TRANS_LOADER,
    //   useValue: {
    //     // dyn load and the content is a ts file
    //     [NbTransLang.EN]: () => import('./localization/en/translations').then(data => data.trans),
    //     [NbTransLang.ZH_CN]: () => import('./localization/zh-CN/translations').then(data => data.trans),
    //     // direct load
    //     // [NbTransLang.ZH_CN]: trans,
    //   },
    // },
    {
      provide: NB_TRANS_LOADER,
      useFactory: (http: HttpClient) => ({
        // https://github.com/ngx-translate/core/issues/1207#issuecomment-673921899
        // it is expecting to get the translation file using HTTP via absolute URL when angualr SSR.
        // So here change the file's path as relative/absolute via environment

        // dyn load and the content is a json file
        // [NbTransLang.EN]: () => http.get('./assets/localization/en/translations.json').toPromise(),
        [NbTransLang.EN]: () => http.get(environment.domain + 'assets/localization/en/translations.json'),
        // [NbTransLang.ZH_CN]: () => http.get('./assets/localization/zh-CN/translations.json').toPromise(),
        [NbTransLang.ZH_CN]: () => http.get(environment.domain + 'assets/localization/zh-CN/translations.json'),
      }),
      deps: [HttpClient]
    },
    // { provide: NB_TRANS_PARAM_KEY_INVALID_WARNING, useValue: false }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
