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
  InstanceOfGame,
  IRegisterFormValues,
} from '@aklapper/model';
import { Request, Response } from 'express';
import {
  createPlayerID,
  filterAvatar,
  playerCreated,
  registerAction,
  registerOnGameInstance,
  updateLastActive,
} from '../index';

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

let ctx: Context, game: InstanceOfGame, output: object;

describe('register chain test', () => {
  beforeAll(() => {
    game = new InstanceOfGame(
      getCurrentMinute(),
      'gameID',
      new Game(new ChutesAndLadders(5, 5))
    );
    ctx = ContextBuilder.build();
    ctx.put(GameContextKeys.GAME, game);
    ctx.put(GameContextKeys.REQUEST, mockReqObj);
    ctx.put(GameContextKeys.RESPONSE, mockRespObj);
    ctx.put(GameContextKeys.ACTION, 'register');
    ctx.put(GameContextKeys.NEXT, '');
    output = { message: 'Player Created' };
  });

  it('should return true for register action', () => {
    expect(registerAction.execute(ctx)).toBeTruthy();
    expect(ctx.get(GameContextKeys.NEXT)).toEqual('create-playerID');
  });

  it('should create a unique player ID', () => {
    const commandResult = createPlayerID.execute(ctx);
    const playerID = ctx.get('playerID') as string;

    expect(commandResult).toBeTruthy();
    expect(playerID.length).toEqual(6);
    expect(ctx.get(GameContextKeys.NEXT)).toEqual('register-on-game');
  });

  it('should register player in game instance', () => {
    const commandResult = registerOnGameInstance.execute(ctx);

    expect(commandResult).toBeTruthy();
    expect(game.instance.playersArray.length).toEqual(1);
    expect(ctx.get(GameContextKeys.NEXT)).toEqual('filter-avatar');
  });

  it('should filter avatar selected from player selection', () => {
    registerOnGameInstance.execute(ctx);

    const commandResult = filterAvatar.execute(ctx);
    expect(commandResult).toBeTruthy();
    expect(
      game.instance.instance.avatarList.find(
        (a) => a.name === game.instance.playersArray[0].name
      )
    ).toBeFalsy();
    expect(ctx.get(GameContextKeys.NEXT)).toEqual('update-last-active');
  });

  it('should update the last active property in InstanceOfGame', () => {
    const commandResult = updateLastActive.execute(ctx);

    expect(commandResult).toBeTruthy();
    expect(game.lastActive).toEqual(getCurrentMinute());
    expect(ctx.get(GameContextKeys.NEXT)).toEqual('player-created');
  });

  it('should add add playerID to response header and add a message object to the out property of context object', () => {
    const commandResult = playerCreated.execute(ctx);

    expect(commandResult).toBeTruthy();
    expect(ctx.get(GameContextKeys.OUTPUT)).toEqual(output);
  });
});
