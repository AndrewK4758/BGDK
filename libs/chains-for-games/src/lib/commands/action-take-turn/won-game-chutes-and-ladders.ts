import { CommandBuilder } from '@bgdk/chain';
import { deRefContextObject } from '@bgdk/de-referencing-utilities';
import { Player } from '@bgdk/games-components-logic';
import { Context, GameContextKeys } from '@bgdk/types-game';

export const wonGameCheckChutesAndLadders = CommandBuilder.build((context: Context) => {
  if (context.get(GameContextKeys.NEXT) && context.getString(GameContextKeys.NEXT) === 'won-game') {
    const { game } = deRefContextObject(context);

    const playerTakingTurn = context.get('player-taking-turn') as Player;
    if (game.instance.wonGame(playerTakingTurn.avatar.location.type)) {
      game.instance.haveWinner = true;
      return false;
    } else context.put(GameContextKeys.NEXT, 'rotate-player');
    return true;
  } else return false;
});

export default wonGameCheckChutesAndLadders;
