// The param key's naming rules consistent with JS variable names
// 1. Consists of letters, numbers, _, and $
// 2. The number can't be the first character
export const paramKeyRegExpRule = '[$a-zA-Z_]+[\\w$]*';
export const nbParamKeyRegExp2Split = new RegExp(`({{${paramKeyRegExpRule}}})`, 'g');