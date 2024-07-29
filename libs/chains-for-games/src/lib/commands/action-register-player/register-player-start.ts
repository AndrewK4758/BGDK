import { CommandBuilder, Context } from '@bgdk/chain';
import { GameContextKeys } from '@bgdk/types-game';

export const registerAction = CommandBuilder.build((context: Context) => {
  if (context.get(GameContextKeys.ACTION) && context.getString(GameContextKeys.ACTION) === 'register') {
    context.put(GameContextKeys.NEXT, 'create-playerID');
    return true;
  } else return false;
});
