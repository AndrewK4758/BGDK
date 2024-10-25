import { parseInput } from '../src/lib/parser/parser';
import { ResponseType } from '../src/types/prompt-input-data-types';

describe('promptBuilder', () => {
  it('should work', () => {
    expect(parseInput({ objective: '', responseFormat: ResponseType.TEXT })).toBeTruthy();
  });
});
