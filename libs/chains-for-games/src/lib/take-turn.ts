import { ChainBuilder, CommandBuilder, Context } from '@aklapper/chain';
import { Player } from '@aklapper/chutes-and-ladders'; // move to model
import { deRefContextObject, GameContextKeys, getCurrentMinute, getPlayerID, TurnStatus } from '@aklapper/model';

export const takeTurn = CommandBuilder.build((context: Context) => {
  if (
    context.get(GameContextKeys.ACTION) &&
    context.getString(GameContextKeys.ACTION) === 'take-turn'
  ) {
    const { game, req, resp } = deRefContextObject(context);

    if (!game.instance.readyToPlay) {
      context.put(GameContextKeys.OUTPUT, { turnStatus: TurnStatus.NOT_READY });
      resp.setHeader(
        '__current_game__',
        req.header('__current_game__') as string
      );
      return false;
    }
    if (game.instance.readyToPlay && game.instance.haveWinner) {
      context.put(GameContextKeys.OUTPUT, { turnStatus: TurnStatus.GAME_WON });
      resp.setHeader(
        '__current_game__',
        req.header('__current_game__') as string
      );
      return false;
    }
    game.updateLastActive(getCurrentMinute());
    context.put(GameContextKeys.NEXT, 'verify-player');
    return true;
  } else return false;
});
export const verifyPlayer = CommandBuilder.build((context: Context) => {
  if (
    context.get(GameContextKeys.NEXT) &&
    context.getString(GameContextKeys.NEXT) === 'verify-player'
  ) {
    const { req, game, resp } = deRefContextObject(context);

    const playerTakingTurn = getPlayerID(req);

    if (playerTakingTurn === game.instance.playerInTurn.id) {
      context.put('player-taking-turn', game.instance.playerInTurn as Player);
      context.put(GameContextKeys.NEXT, 'roll-dice');
      console.log(
        req.header('__current_game__'),
        'in pass to roll dice FAIL call'
      );
      return true;
    } else {
      resp.setHeader(
        '__current_game__',
        req.header('__current_game__') as string
      );
      context.put(GameContextKeys.OUTPUT, { turnStatus: TurnStatus.INVALID });
      return false;
    }
  } else return false;
});
export const rollDice = CommandBuilder.build((context: Context) => {
  if (
    context.get(GameContextKeys.NEXT) &&
    context.getString(GameContextKeys.NEXT) === 'roll-dice'
  ) {
    const { game } = deRefContextObject(context);

    const moveDist = game.instance.instance.DIE.roll();
    context.put('moveDist', moveDist as number);
    context.put(GameContextKeys.NEXT, 'move-avatar');
    return true;
  } else return false;
});
export const moveAvatar = CommandBuilder.build((context: Context) => {
  if (
    context.get(GameContextKeys.NEXT) &&
    context.getString(GameContextKeys.NEXT) === 'move-avatar'
  ) {
    const playerTakingTurn = context.get('player-taking-turn') as Player;
    const moveDist = context.get('moveDist') as number;
    playerTakingTurn.avatar.move(moveDist);
    context.put('player-taking-turn', playerTakingTurn);
    context.put(GameContextKeys.NEXT, 'won-game');
    context.put(GameContextKeys.OUTPUT, { turnStatus: TurnStatus.VALID });
    return true;
  } else return false;
});
export const wonGame = CommandBuilder.build((context: Context) => {
  if (
    context.get(GameContextKeys.NEXT) &&
    context.getString(GameContextKeys.NEXT) === 'won-game'
  ) {
    const { game } = deRefContextObject(context);

    const playerTakingTurn = context.get('player-taking-turn') as Player;
    if (game.instance.wonGame(playerTakingTurn.avatar.location.type)) {
      game.instance.haveWinner = true;
      return false;
    } else context.put(GameContextKeys.NEXT, 'rotate-player');
    return true;
  } else return false;
});
export const rotatePlayer = CommandBuilder.build((context: Context) => {
  if (
    context.get(GameContextKeys.NEXT) &&
    context.getString(GameContextKeys.NEXT) === 'rotate-player'
  ) {
    const { game, req, resp } = deRefContextObject(context);

    game.instance.rotatePlayers();

    resp.setHeader(
      '__current_game__',
      req.header('__current_game__') as string
    );
    return true;
  } else return false;
});

export const turnChain = ChainBuilder.build(
  [takeTurn, verifyPlayer, rollDice, moveAvatar, wonGame, rotatePlayer],
  false
);
