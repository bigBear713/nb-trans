import { NbTransToolsService } from '../nb-trans-tools.service';
import { TestBed } from '@angular/core/testing';
import { INbTransParams } from '../../models';
import { handleSentenceWithParamsTestData } from '../../testing';
import { NbCommonTestingModule } from '@bigbear713/nb-common';
import { NB_TRANS_PARAM_KEY_INVALID_WARNING } from '../../constants';

describe('Service: NbTransTools', () => {
  let service: NbTransToolsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NbCommonTestingModule],
      providers: [
        NbTransToolsService,
        { provide: NB_TRANS_PARAM_KEY_INVALID_WARNING, useValue: false },
      ],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(NbTransToolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getFinalKey()', () => {
    [
      { params: { key: 'transKey' }, expect: 'transKey' },
      { params: { key: 'transKey', prefix: 'prefix' }, expect: 'prefix.transKey' },
    ].forEach(item => {
      it(`the params is ${JSON.stringify(item.params)}`, () => {
        const { key, prefix } = item.params;
        const finalKey = service.getFinalKey(key, prefix);
        expect(finalKey).toEqual(item.expect);
      });
    });
  });

  describe('#handleSentenceWithParams()', () => {
    handleSentenceWithParamsTestData.forEach(item => {
      it(item.title, () => {
        const params: INbTransParams | undefined = item.test.params;
        const result = service.handleSentenceWithParams(item.test.trans, params);
        expect(result).toEqual(item.expect.result);
      });
    });
  });

  describe('#handleTrans()', () => {
    [
      { params: { trans: 'str1' }, expect: ['str1'] },
      {
        params: { trans: 'str1 <0>str2</0>' },
        expect: ['str1 ', { index: 0, content: 'str2', list: [] }],
      },
      {
        params: { trans: '  str1 <0>str2</0> str3  ' },
        expect: ['  str1 ', { index: 0, content: 'str2', list: [] }, ' str3  '],
      },
      {
        params: { trans: '<0>str1</0> str2 <0>str3</0> str4  <0> str5 </0>' },
        expect: [
          { index: 0, content: 'str1', list: [] },
          ' str2 ',
          { index: 0, content: 'str3', list: [] },
          ' str4  ',
          { index: 0, content: ' str5 ', list: [] },
        ],
      },
      {
        params: {
          trans:
            '<0><1>str1</1></0> str2 <0> str3 <2>str3</2> str3 </0> str4  <0>str5 <5> str5 </5> str5 <5> str5 </5> str5</0>',
        },
        expect: [
          { index: 0, content: '<1>str1</1>', list: [{ index: 1, content: 'str1', list: [] }] },
          ' str2 ',
          {
            index: 0,
            content: ' str3 <2>str3</2> str3 ',
            list: [' str3 ', { index: 2, content: 'str3', list: [] }, ' str3 '],
          },
          ' str4  ',
          {
            index: 0,
            content: 'str5 <5> str5 </5> str5 <5> str5 </5> str5',
            list: [
              'str5 ',
              { index: 5, content: ' str5 ', list: [] },
              ' str5 ',
              { index: 5, content: ' str5 ', list: [] },
              ' str5',
            ],
          },
        ],
      },
    ].forEach(item => {
      it(`the params is ${JSON.stringify(item.params)}`, () => {
        const { trans } = item.params;
        const handleResult = service.handleTrans(trans);
        expect(handleResult).toEqual(item.expect);
      });
    });
  });

  it('#NbTransToolsService.checkWindow()', () => {
    expect(NbTransToolsService.checkWindow()).toEqual(true);
  });

  it('#NbTransToolsService.checkNavigator()', () => {
    expect(NbTransToolsService.checkNavigator()).toEqual(true);
  });

  describe('#isTranslatedStringValid()', () => {
    [
      { title: 'value is undefined', trans: undefined, expect: false },
      { title: 'value is string', trans: 'abc', expect: true },
      { title: 'value is empty string', trans: '', expect: false },
      { title: 'value only include some whitespace', trans: ' ', expect: true },
      { title: 'value is number', trans: 123, expect: false },
      { title: 'value is boolean', trans: true, expect: false },
      { title: 'value is array', trans: [], expect: false },
      { title: 'value is symbol', trans: Symbol(), expect: false },
      { title: 'value is object', trans: { p1: 'abc' }, expect: false },
      { title: 'value is function', trans: () => true, expect: false },
    ].forEach(item => {
      it(item.title, () => {
        expect(service.isTranslatedStringValid(item.trans)).toEqual(item.expect);
      });
    });
  });

  describe('Do not print the warning info about the invalid param key', () => {
    let service2: NbTransToolsService;

    beforeEach(async () => {
      TestBed.resetTestingModule();
      await TestBed.configureTestingModule({
        imports: [NbCommonTestingModule],
        providers: [
          NbTransToolsService,
          { provide: NB_TRANS_PARAM_KEY_INVALID_WARNING, useValue: true },
        ],
      });
      service2 = TestBed.inject(NbTransToolsService);
    });

    it('will not print warning info when the param key is invalid', () => {
      const spyFn = spyOn(console, 'warn').and.callThrough();

      const trans = 'This is {{p!}}';
      const params = { 'p!': '123' };
      service2.handleSentenceWithParams(trans, params);
      expect(spyFn).toHaveBeenCalledTimes(1);
    });
  });
});
