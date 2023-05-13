/**
 * The naming rules about param key:
 * 1. Consists of letters, numbers, _, and $
 * 2. The number can't be the first character
 */
export interface INbTransParams {
  [key: string]: string;
}
