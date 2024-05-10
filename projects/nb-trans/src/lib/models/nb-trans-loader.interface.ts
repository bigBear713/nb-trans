import { Observable } from 'rxjs';

export interface INbTransLoader {
  [langKey: string]: Object | (() => Observable<Object> | Promise<Object>);
}
