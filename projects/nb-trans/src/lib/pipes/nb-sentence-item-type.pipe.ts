import { Pipe, PipeTransform } from '@angular/core';
import { NbValueTypeService } from '@bigbear713/nb-common';
import { NbTransSentenceItem } from '../constants';
import { INbTransSentencePart } from '../models';

@Pipe({ standalone: true, name: 'nbSentenceItemType' })
export class NbSentenceItemTypePipe implements PipeTransform {

  constructor(private valueType: NbValueTypeService) { }

  transform(value: INbTransSentencePart): number | undefined {
    let type: number | undefined;

    if (this.valueType.isString(value)) {
      type = NbTransSentenceItem.STR;
    } else if (this.valueType.isNumber((value?.index))) {
      type = (Array.isArray(value.list) && value.list.length)
        ? NbTransSentenceItem.MULTI_COMP
        : NbTransSentenceItem.COMP;
    }

    return type;
  }
}
