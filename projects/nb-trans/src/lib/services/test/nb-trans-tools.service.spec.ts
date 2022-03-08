import { NbTransToolsService } from '../nb-trans-tools.service';
import { TestBed, inject } from '@angular/core/testing';
import { INbTransParams } from '../../models';
import { handleSentenceWithParamsTestData } from '../../testing';
import { NbCommonTestingModule } from '@bigbear713/nb-common';

describe('Service: NgTransTools', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NbCommonTestingModule],
      providers: [NbTransToolsService]
    });
  });

  it('should be created', inject([NbTransToolsService], (service: NbTransToolsService) => {
    expect(service).toBeTruthy();
  }));

  describe('#getFinalKey()', () => {
    [
      { params: { key: 'transKey' }, expect: 'transKey' },
      { params: { key: 'transKey', prefix: 'prefix' }, expect: 'prefix.transKey' },
    ].forEach(item => {
      it(`the params is ${JSON.stringify(item.params)}`, inject([NbTransToolsService], (service: NbTransToolsService) => {
        const { key, prefix } = item.params;
        const finalKey = service.getFinalKey(key, prefix);
        expect(finalKey).toEqual(item.expect);
      }));
    });
  });

  describe('#handleSentence()', () => {
    [
      { params: { str: ' sentence ', searchStr: '{{p1}}', replaceStr: 'v1' }, expect: ' sentence ' },
      { params: { str: ' sentence {{p1}} ', searchStr: '{{p1}}', replaceStr: 'v1' }, expect: ' sentence v1 ' },
      { params: { str: '{{p1}} test {{p1}} test {{p1}}', searchStr: '{{p1}}', replaceStr: 'v1' }, expect: 'v1 test v1 test v1' },
      { params: { str: 'sentence {{p1}}', searchStr: '{{p1}}', replaceStr: '' }, expect: 'sentence ' },
      { params: { str: 'sentence {{p1}}', searchStr: '{{p1}}', replaceStr: '{{p1}}' }, expect: 'sentence {{p1}}' },
    ].forEach(item => {
      it(`the params is ${JSON.stringify(item.params)}`, inject([NbTransToolsService], (service: NbTransToolsService) => {
        const { str, searchStr, replaceStr } = item.params;
        const finalKey = service.handleSentence(str, searchStr, replaceStr);
        expect(finalKey).toEqual(item.expect);
      }));
    });
  });

  describe('#handleSentenceWithParams()', () => {
    handleSentenceWithParamsTestData.forEach(item => {
      it(item.title, inject([NbTransToolsService], (service: NbTransToolsService) => {
        const params: INbTransParams | undefined = item.test.params;
        const result = service.handleSentenceWithParams(item.test.trans, params);
        expect(result).toEqual(item.expect.result);
      }));
    });
  });

  describe('#handleTrans()', () => {
    [
      { params: { trans: 'str1', }, expect: ['str1'] },
      {
        params: { trans: 'str1 <0>str2</0>', },
        expect: [
          'str1 ',
          { index: 0, content: 'str2', list: [], }
        ]
      },
      {
        params: { trans: '  str1 <0>str2</0> str3  ', },
        expect: [
          '  str1 ',
          { index: 0, content: 'str2', list: [], },
          ' str3  ',
        ]
      },
      {
        params: { trans: '<0>str1</0> str2 <0>str3</0> str4  <0> str5 </0>', },
        expect: [
          { index: 0, content: 'str1', list: [], },
          ' str2 ',
          { index: 0, content: 'str3', list: [], },
          ' str4  ',
          { index: 0, content: ' str5 ', list: [], },
        ]
      },
      {
        params: { trans: '<0><1>str1</1></0> str2 <0> str3 <2>str3</2> str3 </0> str4  <0>str5 <5> str5 </5> str5 <5> str5 </5> str5</0>', },
        expect: [
          { index: 0, content: '<1>str1</1>', list: [{ index: 1, content: 'str1', list: [], },], },
          ' str2 ',
          { index: 0, content: ' str3 <2>str3</2> str3 ', list: [' str3 ', { index: 2, content: 'str3', list: [], }, ' str3 ',], },
          ' str4  ',
          { index: 0, content: 'str5 <5> str5 </5> str5 <5> str5 </5> str5', list: ['str5 ', { index: 5, content: ' str5 ', list: [], }, ' str5 ', { index: 5, content: ' str5 ', list: [], }, ' str5'], },
        ]
      },
    ].forEach(item => {
      it(`the params is ${JSON.stringify(item.params)}`, inject([NbTransToolsService], (service: NbTransToolsService) => {
        const { trans } = item.params;
        const handleResult = service.handleTrans(trans);
        expect(handleResult).toEqual(item.expect);
      }));
    });
  });
});
