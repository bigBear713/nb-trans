import { Injectable } from '@angular/core';
import { INbTransSentencePart, INbTransParams } from '../models';
import { v4 as uuidv4 } from 'uuid';
import { NbValueTypeService } from '@bigbear713/nb-common';

type StrKeyObject = { [key: string]: string };

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

    const paramsKeysUUID = this.getParamsKeyUuid(paramsKeys);
    // first, replace the param keys as uuid keys
    // then, replace the uuid keys as params value,
    // so the value will not be wrong when the params value is same with other param value
    const transWithUUIDKey = this.replaceParamsKeysAsUuidKey(
      trans,
      { keys: paramsKeys, keysUUID: paramsKeysUUID }
    );
    return this.replaceUuidKeyAsParamsValue(
      transWithUUIDKey,
      { params, keys: paramsKeys, keysUUID: paramsKeysUUID }
    );
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

  private getParamsKeyUuid(paramsKey: string[]): StrKeyObject {
    return paramsKey.reduce(
      (pre: StrKeyObject, key) => {
        pre[key] = uuidv4();
        return pre;
      },
      {}
    );
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

  private replaceParamsKeysAsUuidKey(
    trans: string,
    paramsArgs: { keys: string[], keysUUID: StrKeyObject }
  ): string {
    const { keys, keysUUID } = paramsArgs;
    keys.forEach(key => {
      trans = this.handleSentence(trans, `{{${key}}}`, keysUUID[key]);
    });
    return trans;
  }

  private replaceUuidKeyAsParamsValue(
    trans: string,
    paramsArgs: { params: INbTransParams, keys: string[], keysUUID: StrKeyObject }
  ): string {
    const { params, keys, keysUUID } = paramsArgs;
    keys.forEach(key => {
      trans = this.handleSentence(trans, keysUUID[key], params[key]);
    });
    return trans;
  }
}
