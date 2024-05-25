import { Context, ContextBuilder } from '@aklapper/chain';
import { Avatar, Color, Player } from '@aklapper/chutes-and-ladders';
import {
  GameContextKeys,
  GamePlayerValidation,
  InstanceOfGame,
  IRegisterFormValues,
} from '@aklapper/model';
import { Request, Response } from 'express';
import { outputContextResponse } from '../index';

interface ICtxOutput {
  message: string;
}

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

let ctx: Context, output: ICtxOutput;

describe('adds out prop of context obj to response obj', () => {
  beforeEach(() => {
    ctx = ContextBuilder.build();
    output = { message: 'output to client as json' } as ICtxOutput;
    ctx.put(GameContextKeys.RESPONSE, mockRespObj);
  });

  afterEach(() => {
    ctx.state.clear();
  });
  it('should put the value of the out property on the context object onto the response object to send to client', () => {
    ctx.put(GameContextKeys.OUTPUT, output);
    const commandResult = outputContextResponse.execute(ctx);

    expect(commandResult).toBeTruthy();
    expect(mockRespObj.status).toEqual(201);
    expect(mockRespObj.json).toEqual(output);
    expect(ctx.get(GameContextKeys.OUTPUT)).toEqual(output);
  });

  it('should send status of 200 without data being sent from context object', () => {
    const commandResult = outputContextResponse.execute(ctx);

    expect(commandResult).toBeTruthy();
    expect(mockRespObj.status).toEqual(200);
    expect(ctx.get(GameContextKeys.OUTPUT)).toBeFalsy();
  });
});
