import { TestBed } from '@angular/core/testing';
import { NbTransToolsService } from '../../services';
import { handleSentenceWithParamsTestData, NgTransTestingModule } from '../../testing';
import { NbTransContentPipe } from '../nb-trans-content.pipe';

describe('Pipe: NbTransContente', () => {
  let pipe: NbTransContentPipe;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgTransTestingModule],
      declarations: []
    })
      .compileComponents();
  });

  beforeEach(() => {
    const transToolsService = TestBed.inject(NbTransToolsService);
    pipe = new NbTransContentPipe(transToolsService)
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('#transform()', () => {
    handleSentenceWithParamsTestData.forEach(item => {
      it(item.title, () => {
        const result = pipe.transform(item.test.trans, item.test.params);
        expect(result).toEqual(item.expect.result);
      });
    });
  });

});
