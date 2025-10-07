import { InjectionToken } from '@angular/core';
import { INbTranslation } from '../models';

export const NB_TRANS_LOADER = new InjectionToken<{ [key: string]: INbTranslation }>(
  'nb-trans-loader'
);
