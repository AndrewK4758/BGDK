import { parseInput } from '../src/lib/parser/parser';
import { ResponseType } from '../src/types/prompt-input-data-types';

describe('promptBuilder', () => {
  it('should work', () => {
    const objective = 'test parse input function';
    const responseType = ResponseType.TEXT;
    const input = { objective: objective, responseFormat: responseType };
    const output = parseInput(input);
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';

    expect(output).toEqual(
      `${xmlHeader}\n<root>\n  <objective>${objective}</objective>\n  <responseFormat>${ResponseType.TEXT}</responseFormat>\n</root>`,
    );
  });
});
