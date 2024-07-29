import { CommandBuilder, Context } from '@bgdk/chain';
import { deRefContextObject } from '@bgdk/de-referencing-utilities';
import { GameContextKeys } from '@bgdk/types-game';

export const setPlayerInTurn = CommandBuilder.build((context: Context) => {
  if (context.get(GameContextKeys.NEXT) && context.getString(GameContextKeys.NEXT) === 'set-player-in-turn') {
    const { game } = deRefContextObject(context);

    game.instance.playerInTurn = game.instance.playersArray[0];
    context.put(GameContextKeys.NEXT, 'send-start-game-status');

    return true;
  } else return false;
});
