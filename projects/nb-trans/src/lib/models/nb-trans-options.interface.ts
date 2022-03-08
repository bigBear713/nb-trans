import { INbTransParams } from './nb-trans-params.interface';

export interface INbTransOptions {
  prefix?: string;
  params?: INbTransParams;
  // return the trans key when the trans content is empty,
  // default is true
  returnKeyWhenEmpty?: boolean;
}
