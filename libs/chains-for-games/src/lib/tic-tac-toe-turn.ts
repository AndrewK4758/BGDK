import { /*ChainBuilder,*/ CommandBuilder, Context } from '@bgdk/chain';
import { deRefContextObject, getPlayerID } from '@bgdk/de-referencing-utilities';
import { Player } from '@bgdk/games-components-logic';
import { getCurrentMinute } from '@bgdk/instance-of-game';
import { GameContextKeys, TurnStatus } from '@bgdk/types-game';

// SEND THE INDEX OF THE SELECTED SPACE IN REQ BODY
// PARSE REQ BODY AND LAND X OR O ON SELECETED SPACE

export const takeTurnTicTacToe = CommandBuilder.build((context: Context) => {
  if (context.get(GameContextKeys.ACTION) && context.getString(GameContextKeys.ACTION) === ' take-turn') {
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

export const verifyPlayer = CommandBuilder.build((context: Context) => {
  if (context.get(GameContextKeys.NEXT) && context.getString(GameContextKeys.NEXT) === 'verify-player') {
    const { req, game } = deRefContextObject(context);

    const playerTakingTurn = getPlayerID(req);

    if (playerTakingTurn === game.instance.playerInTurn.id) {
      context.put('player-taking-turn', game.instance.playerInTurn as Player);
      context.put(GameContextKeys.NEXT, 'set-game-piece');
      return true;
    } else {
      context.put(GameContextKeys.OUTPUT, { turnStatus: TurnStatus.INVALID });
      return false;
    }
  } else return false;
});
