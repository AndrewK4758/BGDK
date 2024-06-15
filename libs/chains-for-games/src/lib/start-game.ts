import { ChainBuilder, CommandBuilder, Context } from '@aklapper/chain';
import { Player } from '@aklapper/chutes-and-ladders';
import { deRefContextObject } from '@aklapper/de-referencing-utilities';
import { GameContextKeys, GameInstanceID } from '@aklapper/game-types';

export const startGame = CommandBuilder.build((context: Context) => {
  if (
    context.get(GameContextKeys.ACTION) &&
    context.getString(GameContextKeys.ACTION) === 'start'
  ) {
    context.put(GameContextKeys.NEXT, 'verify-ready-to-play');
    return true;
  } else return false;
});

export const verifyReadyToPlay = CommandBuilder.build((context: Context) => {
  if (
    context.get(GameContextKeys.NEXT) &&
    context.getString(GameContextKeys.NEXT) === 'verify-ready-to-play'
  ) {
    const { game } = deRefContextObject(context);

    const readyToPlay = game.instance.verifyReadyToPlay();

    if (readyToPlay) {
      context.put('ready-to-play', readyToPlay);
      context.put(GameContextKeys.NEXT, 'set-avatars-on-start');
      return true;
    } else {
      context.put(GameContextKeys.OUTPUT, {
        gameStatus: 'Game Not Ready to Start',
      });
      return false;
    }
  } else return false;
});

export const setAvatarsOnStart = CommandBuilder.build((context: Context) => {
  if (
    context.get(GameContextKeys.NEXT) &&
    context.getString(GameContextKeys.NEXT) === 'set-avatars-on-start' &&
    context.get('ready-to-play')
  ) {
    const { game } = deRefContextObject(context);

    game.instance.playersArray.forEach((p: Player, i: number) => {
      if (p.avatar.location) p.avatar.location.leave();
      else p.order = i + 1;
      game.instance.instance.startSpace.land(p.avatar);
    });

    context.put(GameContextKeys.NEXT, 'set-player-in-turn');

    return true;
  } else return false;
});

export const setPlayerInTurn = CommandBuilder.build((context: Context) => {
  if (
    context.get(GameContextKeys.NEXT) &&
    context.getString(GameContextKeys.NEXT) === 'set-player-in-turn'
  ) {
    const { game } = deRefContextObject(context);

    game.instance.playerInTurn = game.instance.playersArray[0];
    context.put(GameContextKeys.NEXT, 'send-start-game-status');

    return true;
  } else return false;
});

export const sendStartGameStatus = CommandBuilder.build((context: Context) => {
  if (
    context.get(GameContextKeys.NEXT) &&
    context.getString(GameContextKeys.NEXT) === 'send-start-game-status'
  ) {
    const { req, resp } = deRefContextObject(context);
    resp.setHeader(
      'current-game',
      req.header('current-game') as GameInstanceID
    );
    context.put(GameContextKeys.OUTPUT, { message: 'Game Started' });
    return true;
  } else return false;
});

export const startGameChain = ChainBuilder.build(
  [
    startGame,
    verifyReadyToPlay,
    setAvatarsOnStart,
    setPlayerInTurn,
    sendStartGameStatus,
  ],
  false
);
