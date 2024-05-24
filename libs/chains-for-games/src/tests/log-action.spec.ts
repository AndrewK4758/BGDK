import { Context, ContextBuilder } from '@aklapper/chain';
import { logAction } from '../index';
import { GameContextKeys } from '@aklapper/model';

let ctx: Context;

describe('it should log the action property to the console', () => {
  beforeAll(() => {
    ctx = ContextBuilder.build();
    ctx.put(GameContextKeys.ACTION, 'ACTION');
  });

  it('logs action off context to console', () => {
    const commandResult = logAction.execute(ctx);

    expect(commandResult).toBeTruthy();
    expect(ctx.getString('ACTION')).toEqual('ACTION');
  });
});
