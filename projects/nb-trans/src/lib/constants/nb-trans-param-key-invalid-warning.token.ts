import { InjectionToken } from '@angular/core';

export const NB_TRANS_PARAM_KEY_INVALID_WARNING = new InjectionToken<boolean>(
  'Whether to print the warning info when the param key is invalid?'
);
