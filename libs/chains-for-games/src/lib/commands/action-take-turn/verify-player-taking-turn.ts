import { CommandBuilder, Context } from '@bgdk/chain';
import { deRefContextObject, getPlayerID } from '@bgdk/de-referencing-utilities';
import { Player } from '@bgdk/games-components-logic';
import { GameContextKeys, TurnStatus } from '@bgdk/types-game';
import { nextCommandMap } from '../../utils/context-next-map';

export const verifyPlayerTakingTurn = CommandBuilder.build((context: Context) => {
  if (context.get(GameContextKeys.NEXT) && context.getString(GameContextKeys.NEXT) === 'verify-player') {
    const { req, game } = deRefContextObject(context);

    const playerTakingTurn = getPlayerID(req);

    if (playerTakingTurn === game.instance.playerInTurn.id) {
      context.put('player-taking-turn', game.instance.playerInTurn as Player);

      const nextCommand = nextCommandMap.get(req.params['id'])?.get(context.getString(GameContextKeys.NEXT));
      console.log(nextCommand);
      context.put(GameContextKeys.NEXT, nextCommand);
      return true;
    } else {
      context.put(GameContextKeys.OUTPUT, { turnStatus: TurnStatus.INVALID });
      return false;
    }
  } else return false;
});
