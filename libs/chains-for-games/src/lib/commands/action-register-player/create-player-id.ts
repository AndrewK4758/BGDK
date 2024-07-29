import { CommandBuilder, Context } from '@bgdk/chain';
import { GameContextKeys } from '@bgdk/types-game';
import ShortUniqueId from 'short-unique-id';

export const createPlayerID = CommandBuilder.build((context: Context) => {
  if (context.get(GameContextKeys.NEXT) && context.getString(GameContextKeys.NEXT) === 'create-playerID') {
    const playerID = new ShortUniqueId().rnd();
    context.put('playerID', playerID as string);
    context.put(GameContextKeys.NEXT, 'register-on-game');
    return true;
  } else return false;
});
