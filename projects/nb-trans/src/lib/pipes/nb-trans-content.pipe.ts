import { Pipe, PipeTransform } from '@angular/core';
import { INbTransParams } from '../models';
import { NbTransToolsService } from '../services';

@Pipe({ standalone: true, name: 'nbTransContent' })
export class NbTransContentPipe implements PipeTransform {

  constructor(private transToolsService: NbTransToolsService) { }

  transform(trans: string, params?: INbTransParams): string {
    return this.transToolsService.handleSentenceWithParams(trans, params);
  }
}
