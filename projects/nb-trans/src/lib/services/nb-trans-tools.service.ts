import { Injectable } from '@angular/core';
import { INbTransSentencePart, INbTransParams } from '../models';
import { NbValueTypeService } from '@bigbear713/nb-common';
import { nbParamKeyRegExp2Split, paramKeyRegExpRule } from '../constants/nb-param-key-regexp';

@Injectable({ providedIn: 'root' })
export class NbTransToolsService {

  static checkNavigator(): boolean {
    return NbTransToolsService.checkWindow() && typeof window.navigator !== 'undefined'
  }

  static checkWindow(): boolean {
    return typeof window !== 'undefined';
  }

  constructor(private valueType: NbValueTypeService) { }

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

    // First, split the trans string to string array via params key,
    // like this: 'This is {{p1}} and {{p2}} and {{p1}}.' --> 
    // ['This is ','{{p1}}',' and ','{{p2}}',' and ','{{p1}}','.'].
    // Then replace the params key as params value, like this:
    // ['This is ','param1',' and ','param2',' and ','param1','.'] 
    // Last, make array join as string, like this: 'This is param1 and param2 and param1.'
    const cleanedParams = this.cleanParams(params, paramsKeys);
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

  private cleanParams(params: INbTransParams, paramsKeys: string[]) {
    // because after calling RegExp's test function, the lastIndex value will be changed, so have to set it as 0.
    // so create a new value every time to make sure the regexp will not affect anywhere
    const nbParamKeyRegExp = new RegExp(paramKeyRegExpRule, 'g');
    return paramsKeys.filter(key => {
      const isValid = nbParamKeyRegExp.test(key);
      nbParamKeyRegExp.lastIndex = 0;
      return isValid;
    }).reduce((prev, key) => {
      prev[`{{${key}}}`] = params[key];
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

  private replaceAsParamsValueInSplitArr(transSplitArr: string[], params: INbTransParams) {
    transSplitArr.forEach((item, index) => {
      const paramValue = params[item];
      if (paramValue) {
        transSplitArr[index] = paramValue;
      }
    });
    return transSplitArr;
  }

}
