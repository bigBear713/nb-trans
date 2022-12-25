import { TestBed } from '@angular/core/testing';
import { NbValueTypeService } from '@bigbear713/nb-common';
import { isString } from 'lodash-es';
import { NbTransSentenceItem } from '../../constants';
import { INbTransSentencePart } from '../../models';
import { NbSentenceItemTypePipe } from '../nb-sentence-item-type.pipe';

describe('Pipe: NbSentenceItemType', () => {
  let pipe: NbSentenceItemTypePipe;

  beforeEach(() => {
    const valueType = TestBed.inject(NbValueTypeService);
    pipe = new NbSentenceItemTypePipe(valueType);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('#transform()', () => {
    [
      { params: undefined as any, expect: undefined },
      { params: 'strContent', expect: NbTransSentenceItem.STR },
      { params: { index: 0, content: 'strContent', list: [] }, expect: NbTransSentenceItem.COMP },
      { params: { index: 0, content: '<0>str</0>', list: [{ index: 0, content: 'str', list: [] }] }, expect: NbTransSentenceItem.MULTI_COMP },
      { params: { index: undefined, content: 'strContent', list: [] } as unknown as INbTransSentencePart, expect: undefined },
      { params: { index: undefined, content: 'strContent', list: undefined } as unknown as INbTransSentencePart, expect: undefined },
    ].forEach(item => {
      it(`the params is ${isString(item.params) ? item.params : JSON.stringify(item.params)}`, () => {
        const type = pipe.transform(item.params);
        expect(type).toEqual(item.expect);
      });
    });
  });

});
