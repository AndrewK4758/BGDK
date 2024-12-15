import { ContextBuilder } from '@bgdk/chain';
import { Context, GameContextKeys } from '@bgdk/types-game';
import { logAction } from '../src/lib/commands/action-log/log-actions-start';

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
