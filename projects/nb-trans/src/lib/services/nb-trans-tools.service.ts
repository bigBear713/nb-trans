import { Injectable } from '@angular/core';
import { INbTransSentencePart, INbTransParams } from '../models';
import { NbValueTypeService } from '@bigbear713/nb-common';

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

  handleSentence(str: string, searchStr: string, replaceStr: string): string {
    return str.replace(new RegExp(searchStr, 'g'), replaceStr);
  };

  handleSentenceWithParams(trans: string, params?: INbTransParams): string {
    if (!params) {
      return trans;
    }

    const paramsKeys = Object.keys(params);
    if (!paramsKeys.length) {
      return trans;
    }

    // First, split the trans string to string array via params key,
    // like this: 'This is {{p1}} and {{p2}} and {{p1}}.' -> 
    // ['This is ','{{p1}}',' and ','{{p2}}',' and ','{{p1}}','.'] 
    // Then replace the params key as params value, like this:
    // ['This is ','param1',' and ','param2',' and ','param1','.'] 
    // Last, make array join as string, like this: 'This is param1 and param2 and param1.'
    const { specialKeys, specialParams } = this.converParams2SpecialKey(params, paramsKeys)
    const splitStrArr = this.splitTrans(trans, specialKeys);
    return this.replaceAsParamsValueInSplitArr(splitStrArr, specialParams).join('');
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

  private handleCompStr(content: string): {
    index: number;
    content: string;
    list: INbTransSentencePart[];
    otherContent: string;
  } | string {
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

  private converParams2SpecialKey(params: INbTransParams, paramsKeys: string[]) {
    const defaultValue: {
      specialKeys: string[],
      specialParams: INbTransParams,
    } = {
      specialKeys: [],
      specialParams: {}
    };
    return paramsKeys.reduce((prev, key) => {
      const specialKey = `{{${key}}}`;
      prev.specialKeys.push(specialKey);
      prev.specialParams[specialKey] = params[key];
      return prev;
    }, defaultValue);
  }

  private replaceAsParamsValueInSplitArr(transSplitArr: string[], params: INbTransParams): string[] {
    transSplitArr.forEach((item, index) => {
      const paramValue = params[item];
      if (paramValue) {
        transSplitArr[index] = paramValue;
      }
    });
    return transSplitArr;
  }

  private splitTrans(trans: string, specialKeys: string[]): string[] {
    // splitter like this: /({{p1}}|{{p2}})/g
    const splitter = new RegExp(`(${specialKeys.join('|')})`, 'g');
    // origin string: 'This is {{p1}} and {{p2}} and {{p1}}.'
    // expected result: ['This is ','{{p1}}',' and ','{{p2}}',' and ','{{p1}}','.']
    return trans.split(splitter);
  }
}
