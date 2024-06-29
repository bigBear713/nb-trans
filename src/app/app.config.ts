import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  NB_TRANS_DEFAULT_LANG,
  NB_TRANS_LOADER,
  NB_TRANS_PARAM_KEY_INVALID_WARNING,
  NbTransLang,
} from 'nb-trans';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
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
        // [NbTransLang.EN]: () => lastValueFrom(http.get('./assets/localization/en/translations.json')),
        [NbTransLang.EN]: () => http.get('./assets/localization/en/translations.json'),
        [NbTransLang.ZH_CN]: () =>
          lastValueFrom(http.get('./assets/localization/zh-CN/translations.json')),
        // [NbTransLang.ZH_CN]: () => http.get('./assets/localization/zh-CN/translations.json'),
      }),
      deps: [HttpClient],
    },
    // set as false will not display invalid warning info
    { provide: NB_TRANS_PARAM_KEY_INVALID_WARNING, useValue: false },
    provideRouter(routes),
  ],
};
