import { Observable } from 'rxjs';
import { INbTranslation } from './nb-translation.interface';

export interface INbTransLoader {
  [langKey: string]: INbTranslation | (() => Observable<INbTranslation> | Promise<INbTranslation>);
}
