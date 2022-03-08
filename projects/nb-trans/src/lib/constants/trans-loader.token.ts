import { InjectionToken } from '@angular/core';
import { INbTransLoader } from '../models';

export const NB_TRANS_LOADER = new InjectionToken<{ [key: string]: INbTransLoader }>('nb-trans-loader');
