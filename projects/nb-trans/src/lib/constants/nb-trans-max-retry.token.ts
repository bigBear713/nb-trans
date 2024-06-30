import { InjectionToken } from '@angular/core';

export const NB_TRANS_MAX_RETRY = new InjectionToken<number>('nb-trans-max-retry');
/**
 * @deprecated use "NB_TRANS_MAX_RETRY" please
 */
export const NB_TRANS_MAX_RETRY_TOKEN = NB_TRANS_MAX_RETRY;
