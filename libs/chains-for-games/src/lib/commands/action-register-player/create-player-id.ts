import { CommandBuilder } from '@bgdk/chain';
import { deRefContextObject } from '@bgdk/de-referencing-utilities';
import { Context, GameContextKeys } from '@bgdk/types-game';
import ShortUniqueId from 'short-unique-id';

export const createPlayerID = CommandBuilder.build((context: Context) => {
  if (context.get(GameContextKeys.NEXT) && context.getString(GameContextKeys.NEXT) === 'create-playerID') {
    const { req } = deRefContextObject(context);
    if (req.playerID) {
      context.put(GameContextKeys.NEXT, 'register-on-game');
      return true;
    } else {
      const playerID = new ShortUniqueId().rnd();
      context.put('playerID', playerID as string);
      context.put(GameContextKeys.NEXT, 'register-on-game');
      return true;
    }
  } else return false;
});

export default createPlayerID;
