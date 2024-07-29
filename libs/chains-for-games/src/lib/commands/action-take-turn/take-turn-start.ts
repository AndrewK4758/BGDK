import { CommandBuilder, Context } from '@bgdk/chain';
import { deRefContextObject } from '@bgdk/de-referencing-utilities';
import { getCurrentMinute } from '@bgdk/instance-of-game';
import { GameContextKeys, TurnStatus } from '@bgdk/types-game';

export const takeTurnStart = CommandBuilder.build((context: Context) => {
  if (context.get(GameContextKeys.ACTION) && context.getString(GameContextKeys.ACTION) === 'take-turn') {
    const { game, req, resp } = deRefContextObject(context);

    if (!game.instance.readyToPlay) {
      context.put(GameContextKeys.OUTPUT, { turnStatus: TurnStatus.NOT_READY });
      resp.setHeader('current-game', req.header('current-game') as string);
      return false;
    }
    if (game.instance.readyToPlay && game.instance.haveWinner) {
      context.put(GameContextKeys.OUTPUT, { turnStatus: TurnStatus.GAME_WON });
      resp.setHeader('current-game', req.header('current-game') as string);
      return false;
    }
    game.updateLastActive(getCurrentMinute());
    context.put(GameContextKeys.NEXT, 'verify-player');
    return true;
  } else return false;
});
