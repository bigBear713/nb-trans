import { Inject, Injectable, Optional, isDevMode } from '@angular/core';
import { INbTransSentencePart, INbTransParams } from '../models';
import { NbValueTypeService } from '@bigbear713/nb-common';
import { nbParamKeyRegExp, nbParamKeyRegExp2Split, nbParamKeyRegExpRules } from '../constants/nb-param-key-regexp';
import { NB_TRANS_PARAM_KEY_INVALID_WARNING } from '../constants';

const isInDevMode = isDevMode();

@Injectable({ providedIn: 'root' })
export class NbTransToolsService {

  static checkNavigator(): boolean {
    return NbTransToolsService.checkWindow() && typeof window.navigator !== 'undefined'
  }

  static checkWindow(): boolean {
    return typeof window !== 'undefined';
  }

  constructor(
    @Optional() @Inject(NB_TRANS_PARAM_KEY_INVALID_WARNING) private warnParamKeyInvalid: boolean,
    private valueType: NbValueTypeService
  ) {
    this.setWarnParamKeyInvalidDefault();
  }

  getFinalKey(key: string, prefix?: string): string {
    return prefix ? `${prefix}.${key}` : key;
  }

  handleSentenceWithParams(trans: string, params?: INbTransParams): string {
    if (!params) {
      return trans;
    }

    const paramsKeys = Object.keys(params);
    if (!paramsKeys.length) {
      return trans;
    }

    // if the cleanedParams is empty, no need to split the trans string,
    // return trans string directly, and the performance is improved
    const cleanedParams = this.cleanParams(params, paramsKeys);
    if (!Object.keys(cleanedParams).length) {
      return trans;
    }
    // First, split the trans string to string array via params key,
    // like this: 'This is {{p1}} and {{p2}} and {{p1}}.' --> 
    // ['This is ','{{p1}}',' and ','{{p2}}',' and ','{{p1}}','.'].
    // Then replace the params key as params value, like this:
    // ['This is ','param1',' and ','param2',' and ','param1','.'] 
    // Last, make array join as string, like this: 'This is param1 and param2 and param1.'
    const splitStrArr = trans.split(nbParamKeyRegExp2Split);
    return this.replaceAsParamsValueInSplitArr(splitStrArr, cleanedParams).join('');
  }

  handleTrans(trans: string): INbTransSentencePart[] {
    const sentenceList: INbTransSentencePart[] = [];
    while (trans.length) {
      const firstStartFlagIndex = trans.search(/<\d+>/);
      if (firstStartFlagIndex > 0) {
        const contentBeforeFirstComp = trans.slice(0, firstStartFlagIndex);
        sentenceList.push(contentBeforeFirstComp);
      }

      const handleResult = this.handleCompStr(trans);
      if (this.valueType.isString(handleResult)) {
        sentenceList.push(handleResult);
        trans = '';
      } else {
        sentenceList.push({
          index: handleResult.index,
          content: handleResult.content,
          list: handleResult.list,
        });
        trans = handleResult.otherContent;
      }
    }
    return sentenceList;
  }

  /**
   * verify the trans is valid. 
   * If it is undefined, empty string('') or the value is not a string type, 
   * will return false
   * @param trans 
   * @returns 
   */
  isTranslatedStringValid(trans: any): boolean {
    return !!(trans && this.valueType.isString(trans));
  }

  private cleanParams(params: INbTransParams, paramsKeys: string[]) {
    // because after calling RegExp's test function, the lastIndex value will be changed, so have to set it as 0.
    // so create a new value every time to make sure the regexp will not affect anywhere
    const paramKeyRegExp = new RegExp(`{{${nbParamKeyRegExpRules}}}`);
    return paramsKeys.filter(key => {
      const isValid = paramKeyRegExp.test(`{{${key}}}`);
      paramKeyRegExp.lastIndex = 0;

      if (!isValid) this.logParamKeyIsInvalid(key);
      return isValid;
    }).reduce((prev, key) => {
      prev[key] = params[key];
      return prev;
    }, {} as INbTransParams);
  }

  private handleCompStr(content: string) {
    const startFlagIndex = content.search(/<\d+>/);
    if (startFlagIndex === -1) {
      return content;
    }

    let list: INbTransSentencePart[] = [];
    const startFlagEndIndex = content.indexOf('>', startFlagIndex);
    const comIndex = Number(content.slice(startFlagIndex + 1, startFlagEndIndex));

    const endFlag = `</${comIndex}>`;
    const endFlagIndex = content.indexOf(endFlag);
    const comContent = content.slice(startFlagEndIndex + 1, endFlagIndex);

    if (comContent.search(/<\d+>/) > -1) {
      list = this.handleTrans(comContent);
    }

    const otherContent = content.slice(endFlagIndex + endFlag.length, content.length);

    return {
      index: comIndex,
      content: comContent,
      list,
      otherContent,
    };
  }

  private logParamKeyIsInvalid(paramKey: string) {
    if (!isInDevMode || !this.warnParamKeyInvalid) return;

    console.warn(
      `The param key: "${paramKey}" is invalid! 
       It should consist of "letter", "number", "_" or "$", 
       and the "number" can't be the first character.
       See this changelog: https://github.com/bigBear713/nb-trans/blob/master/CHANGELOG.md#v1600`
    );
  }

  private replaceAsParamsValueInSplitArr(transSplitArr: string[], params: INbTransParams) {
    const isParamKeyRegExp = new RegExp(nbParamKeyRegExp2Split);
    const verifyIsParamKey = (data: string): boolean => {
      const isParamsKey = isParamKeyRegExp.test(data);
      isParamKeyRegExp.lastIndex = 0;
      return isParamsKey;
    };

    transSplitArr.forEach((item, index) => {
      if (!verifyIsParamKey(item)) return;

      const key = item.match(nbParamKeyRegExp)![0];
      const paramValue = params[key];
      if (paramValue) {
        transSplitArr[index] = paramValue;
      }
    });
    return transSplitArr;
  }

  private setWarnParamKeyInvalidDefault() {
    if (this.warnParamKeyInvalid !== false) {
      this.warnParamKeyInvalid = true;
    }
  }

}
