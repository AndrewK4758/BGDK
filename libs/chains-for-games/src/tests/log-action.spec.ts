import { Context, ContextBuilder } from '@aklapper/chain';
import { GameContextKeys } from '@aklapper/game-types';
import { logAction } from '../index';

let ctx: Context;
beforeAll(() => {
  ctx = ContextBuilder.build();
  ctx.put(GameContextKeys.ACTION, 'ACTION');
});
afterAll(() => {
  ctx.state.clear();
});
describe('it should log the action property to the console', () => {
  it('logs action off context to console', () => {
    const commandResult = logAction.execute(ctx);

    expect(commandResult).toBeTruthy();
    expect(ctx.getString('ACTION')).toEqual('ACTION');
  });
});
