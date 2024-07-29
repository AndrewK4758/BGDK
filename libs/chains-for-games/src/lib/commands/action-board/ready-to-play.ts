import { CommandBuilder, Context } from '@bgdk/chain';
import { deRefContextObject } from '@bgdk/de-referencing-utilities';
import { GameContextKeys } from '@bgdk/types-game';

export const readyToPlayCheck = CommandBuilder.build((context: Context) => {
  if (context.get(GameContextKeys.NEXT) && context.getString(GameContextKeys.NEXT) === 'ready-to-play-check') {
    const { game } = deRefContextObject(context);
    const playerInTurn =
      game.instance.readyToPlay === true ? game.instance.playerInTurn.avatar.name : 'Waiting for game to start';
    context.put('player-in-turn', playerInTurn);
    context.put(GameContextKeys.NEXT, 'check-if-winner');
    return true;
  } else return false;
});
