import { ChainBuilder, CommandBuilder, Context } from '@bgdk/chain';
import {
  GameBoard,
  GameContextKeys,
  GameInstanceID,
  IPlayersAndBoard,
  IRegisterFormValues,
} from '@bgdk/game-types';
import { deRefContextObject } from '@bgdk/de-referencing-utilities';
import { IPlayer } from '@bgdk/game-types';

export const activePlayers = CommandBuilder.build((context: Context) => {
  if (
    context.get(GameContextKeys.ACTION) &&
    context.getString(GameContextKeys.ACTION) === 'board'
  ) {
    const { game } = deRefContextObject(context);

    const activePlayersArray: IRegisterFormValues[] =
      game.instance.playersArray.map((p: IPlayer) => {
        return {
          playerName: p.name,
          avatarName: p.avatar.name,
          avatarColor: p.avatar.color,
        };
      });
    context.put('active-players-in-game', activePlayersArray);
    context.put(GameContextKeys.NEXT, 'ready-to-play-check');
    return true;
  } else return false;
});

export const readyToPlayCheck = CommandBuilder.build((context: Context) => {
  if (
    context.get(GameContextKeys.NEXT) &&
    context.getString(GameContextKeys.NEXT) === 'ready-to-play-check'
  ) {
    const { game } = deRefContextObject(context);

    const playerInTurn = game.instance.readyToPlay
      ? game.instance.playerInTurn.avatar.name
      : 'Waiting for game to start';
    context.put('player-in-turn', playerInTurn);
    context.put(GameContextKeys.NEXT, 'check-if-winner');
    return true;
  } else return false;
});

export const checkIfWinner = CommandBuilder.build((context: Context) => {
  if (
    context.get(GameContextKeys.NEXT) &&
    context.getString(GameContextKeys.NEXT) === 'check-if-winner'
  ) {
    const { game } = deRefContextObject(context);

    const winner = game.instance.haveWinner;

    if (winner) {
      const winnerMessage = `CONGRATULATIONS ${game.instance.playerInTurn.name}... YOU WON!!!!`;
      context.put('winner-message', winnerMessage);
    } else {
      context.put('winner-message', '');
    }
    context.put(GameContextKeys.NEXT, 'active-data-to-send');
    return true;
  } else return false;
});

export const activeDataToSend = CommandBuilder.build((context: Context) => {
  if (
    context.get(GameContextKeys.NEXT) &&
    context.getString(GameContextKeys.NEXT) === 'active-data-to-send'
  ) {
    const { req, resp, game, io } = deRefContextObject(context);

    const activeDataToSend: IPlayersAndBoard = {
      avatarInTurn: context.get('player-in-turn') as string,
      gameBoard: game.instance.instance.displayGameBoard() as GameBoard,
      activePlayersInGame: context.get(
        'active-players-in-game'
      ) as IRegisterFormValues[],
      winner: context.get('winner-message') as string,
    };

    if (io) {
      console.log('In io.emit event handler');
      io.to(game.gameInstanceID).emit('game-data', activeDataToSend);
      return false;
    } else {
      resp.setHeader(
        'current-game',
        req.header('current-game') as GameInstanceID
      );
      context.put(GameContextKeys.OUTPUT, activeDataToSend);
      return true;
    }
  } else return false;
});

export const activeGameDisplayChain = ChainBuilder.build(
  [activePlayers, readyToPlayCheck, checkIfWinner, activeDataToSend],
  false
);
