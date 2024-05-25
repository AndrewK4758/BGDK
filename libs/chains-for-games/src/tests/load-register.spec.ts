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
  getCurrentMinute,
  ILoadRegisterData,
  InstanceOfGame,
  IRegisterFormValues,
} from '@aklapper/model';
import { Request, Response } from 'express';
import { loadRegister, sendLoadRegister } from '../index';

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

let ctx: Context, game: InstanceOfGame;

describe('test the load-register endpoint chain', () => {
  beforeAll(() => {
    ctx = ContextBuilder.build();
    game = new InstanceOfGame(getCurrentMinute(), 'gameID', new Game(new ChutesAndLadders(5, 5)));
    ctx.put(GameContextKeys.GAME, game);
    ctx.put(GameContextKeys.ACTION, 'load-register');
    ctx.put(GameContextKeys.REQUEST, mockReqObj);
    ctx.put(GameContextKeys.RESPONSE, mockRespObj);
    ctx.put(GameContextKeys.NEXT, '');
    ctx.put(GameContextKeys.OUTPUT, {});
  });

  it('should add avatar list and color list to context object', () => {
    const commandResult = loadRegister.execute(ctx);

    const avatarListAndColors = ctx.get(GameContextKeys.OUTPUT) as ILoadRegisterData;

    expect(commandResult).toBeTruthy();
    expect(ctx.get(GameContextKeys.NEXT)).toEqual('send-load-register-data');
    expect(avatarListAndColors.avatarList).toEqual(game.instance.instance.avatarList);
    expect(avatarListAndColors.avatarColorList).toEqual(Color);
    expect(ctx.get(GameContextKeys.OUTPUT)).toEqual(avatarListAndColors);
  });

  it('should add load register data to out property of context object', () => {
    const commandResult = sendLoadRegister.execute(ctx);

    expect(commandResult).toBeTruthy();
    // expect(ctx.get(GameContextKeys.OUTPUT)).toEqual(ctx.get('load-register-data'));
  });
});
