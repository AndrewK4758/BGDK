import { ChainBuilder, CommandBuilder, Context } from '@bgdk/chain';
import { Player } from '@bgdk/chutes-and-ladders';
import {
  deRefContextObject,
  getPlayerID,
} from '@bgdk/de-referencing-utilities';
import { getCurrentMinute } from '@bgdk/instance-of-game';
import { GameContextKeys, TurnStatus } from '@bgdk/types-game';

export const takeTurn = CommandBuilder.build((context: Context) => {
  if (
    context.get(GameContextKeys.ACTION) &&
    context.getString(GameContextKeys.ACTION) === 'take-turn'
  ) {
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
  if (
    context.get(GameContextKeys.NEXT) &&
    context.getString(GameContextKeys.NEXT) === 'verify-player'
  ) {
    const { req, game } = deRefContextObject(context);

    const playerTakingTurn = getPlayerID(req);

    if (playerTakingTurn === game.instance.playerInTurn.id) {
      context.put('player-taking-turn', game.instance.playerInTurn as Player);
      context.put(GameContextKeys.NEXT, 'roll-dice');
      return true;
    } else {
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
    const { game } = deRefContextObject(context);
    game.instance.rotatePlayers();

    context.put(GameContextKeys.ACTION, 'board');

    return true;
  } else return false;
});

export const turnChain = ChainBuilder.build(
  [takeTurn, verifyPlayer, rollDice, moveAvatar, wonGame, rotatePlayer],
  false
);
