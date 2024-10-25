import { Rule } from '../src/lib/rule';

let rb: Rule;

describe('Test rule builder', () => {
  beforeAll(() => {
    rb = new Rule();
  });

  test('RuleBuilder', () => {
    const r1 = rb.setOrder(1).setTitle('Rule 1').setValue('Rule 1 explains rule 1').build();
    expect(r1.order).toEqual(1);
    expect(r1.title).toEqual('Rule 1');
    expect(r1.value).toEqual('Rule 1 explains rule 1');
  });
});
