import { inject, Pipe, PipeTransform } from '@angular/core';
import { INbTransParams } from '../models';
import { NbTransToolsService } from '../services';

@Pipe({ standalone: true, name: 'nbTransContent' })
export class NbTransContentPipe implements PipeTransform {
  private transToolsService: NbTransToolsService = inject(NbTransToolsService);

  transform(trans: string, params?: INbTransParams): string {
    return this.transToolsService.handleSentenceWithParams(trans, params);
  }
}
