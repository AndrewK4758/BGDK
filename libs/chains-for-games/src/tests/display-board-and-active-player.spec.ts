import { Context, ContextBuilder } from '@aklapper/chain';
import {
  Avatar,
  ChutesAndLadders,
  Color,
  Game,
  Player,
} from '@aklapper/chutes-and-ladders';
import {
  GameContextKeys,
  GamePlayerValidation,
  IPlayersAndBoard,
  IRegisterFormValues,
  InstanceOfGame,
  getCurrentMinute,
} from '@aklapper/model';
import { Request, Response } from 'express';
import {
  activeDataToSend,
  activePlayers,
  checkIfWinner,
  readyToPlayCheck,
} from '../index';

let ctx: Context, game: InstanceOfGame;

export const mockReqObj: Partial<Request> = {
  body: {
    playerName: 'Player Name',
    avatarName: 'XENOMORPH',
    avatarColor: Color.BLACK,
  } as IRegisterFormValues,

  header: jest.fn().mockImplementation((name: string) => {
    const headers = new Map<string, string>();
    const __current_game__ = {
      gameInstanceID: 'game-ID',
      playerID: 'player-2-ID',
    } as GamePlayerValidation;

    headers.set('__current_game__', JSON.stringify(__current_game__));

    return headers.get(name);
  }),
};

export const mockRespObj: Partial<Response> = {
  setHeader: jest
    .fn()
    .mockImplementation((name: string, headerValue: string) => {
      const headers = new Map<string, string>();

      headers.set(name, headerValue);
    }),
  status: jest.fn().mockImplementation((code) => {
    mockRespObj.status = code;
    return mockRespObj;
  }),
  sendStatus: jest
    .fn()
    .mockImplementation((result) => (mockRespObj.status = result)),
  json: jest.fn().mockImplementation((result) => (mockRespObj.json = result)),
};

export const mockAddPlayersToGame = (game: InstanceOfGame) => {
  game.instance.playersArray[0] = new Player('player1', 'player-1-ID');
  game.instance.playersArray[0].order = 1;
  game.instance.playersArray[0].avatar = new Avatar('XENOMORPH', Color.BLACK);
  game.instance.playersArray[1] = new Player('player2', 'player-2-ID');
  game.instance.playersArray[1].order = 2;
  game.instance.playersArray[1].avatar = new Avatar('PREDATOR', Color.RED);
};

describe(`Test the chain that checks and displays active instances' active players, ready to play prop, check if winner prop, data sent to client to show active game info`, () => {
  beforeAll(() => {
    ctx = ContextBuilder.build();
    game = new InstanceOfGame(
      getCurrentMinute(),
      'gameID',
      new Game(new ChutesAndLadders(5, 5))
    );
    mockAddPlayersToGame(game);

    ctx.put(GameContextKeys.GAME, game);
    ctx.put(GameContextKeys.ACTION, 'board');
    ctx.put(GameContextKeys.REQUEST, mockReqObj);
    ctx.put(GameContextKeys.RESPONSE, mockRespObj);
  });

  it('should return all players registered in the game instance', () => {
    const commandResult = activePlayers.execute(ctx);

    expect(commandResult).toBeTruthy();
    expect(
      (ctx.get('active-players-in-game') as IRegisterFormValues[]).length
    ).toEqual(2);
    expect(ctx.getString(GameContextKeys.NEXT)).toEqual('ready-to-play-check');
  });

  it('should check if game is ready to play and put player in turn on ctx object to display', () => {
    ctx.put(GameContextKeys.NEXT, 'ready-to-play-check');
    const commandResult = readyToPlayCheck.execute(ctx);

    expect(commandResult).toBeTruthy();
    expect(ctx.get('player-in-turn')).toEqual('Waiting for game to start');
    expect(ctx.getString(GameContextKeys.NEXT)).toEqual('check-if-winner');
  });

  it('should check if player in turn has won', () => {
    ctx.put(GameContextKeys.NEXT, 'check-if-winner');
    const commandResult = checkIfWinner.execute(ctx);

    expect(commandResult).toBeTruthy();
    expect(ctx.get('winner-message')).toEqual('');
    expect(ctx.getString(GameContextKeys.NEXT)).toEqual('active-data-to-send');
  });

  it('should add all data necessary to show active game details to context object', () => {
    ctx.put(GameContextKeys.NEXT, 'active-data-to-send');
    const commandResult = activeDataToSend.execute(ctx);

    const dataToSendFromCtx = ctx.get(
      GameContextKeys.OUTPUT
    ) as IPlayersAndBoard;

    expect(commandResult).toBeTruthy();
    expect(dataToSendFromCtx.playerInTurn).toEqual('Waiting for game to start');
    expect(dataToSendFromCtx.gameBoard.length).toEqual(10);
    expect(dataToSendFromCtx.activePlayersInGame.length).toEqual(2);
    expect(dataToSendFromCtx.winner).toEqual('');
  });
});
