import { Context, ContextBuilder } from '@aklapper/chain';
import { GameContextKeys } from '@aklapper/game-types';
import { logAction } from '../index';

let ctx: Context;
beforeAll(() => {
  if (ctx) ctx.state.clear();
  ctx = ContextBuilder.build();
  ctx.put(GameContextKeys.ACTION, 'ACTION');
});
describe('it should log the action property to the console', () => {
  it('logs action off context to console', () => {
    const commandResult = logAction.execute(ctx);

    expect(commandResult).toBeTruthy();
    expect(ctx.getString('ACTION')).toEqual('ACTION');
  });
});
