// The param key's naming rules consistent with JS variable names
// 1. Consists of letters, numbers, _, and $
// 2. The number can't be the first character
export const nbParamKeyRegExpRules = '[$_a-zA-Z]+[\\w$]*';
export const nbParamKeyRegExp = new RegExp(nbParamKeyRegExpRules, 'g');
export const nbParamKeyRegExp2Split = new RegExp(`({{\\s*${nbParamKeyRegExpRules}\\s*}})`, 'g');
