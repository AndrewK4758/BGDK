import { CommandBuilder } from '@bgdk/chain';
import { Context, GameContextKeys } from '@bgdk/types-game';

export const startGame = CommandBuilder.build((context: Context) => {
  if (context.get(GameContextKeys.ACTION) && context.getString(GameContextKeys.ACTION) === 'start') {
    context.put(GameContextKeys.NEXT, 'verify-ready-to-play');
    return true;
  } else return false;
});

export default startGame;
