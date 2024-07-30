import { Request, Response } from 'express';
import { Color, GamePlayerValidation, IRegisterFormValues } from '../libs/types/types-game/src';


export const mockReqObj = (): Partial<Request> => {
  const req: Partial<Request> = {
    params: {},
    body: {
      playerName: 'Player Name',
      avatarName: 'XENOMORPH',
      avatarColor: Color.BLACK,
    } as IRegisterFormValues,

    header: jest.fn().mockImplementation((name: string) => {
      const headers = new Map<string, string>();
      const __current_game__ = {
        gameInstanceID: 'gameID',
        playerID: 'p-2-id',
      } as GamePlayerValidation;

      headers.set('current-game', JSON.stringify(__current_game__));

      return headers.get(name);
    }),
  };
  return req;
};
const headers = new Map<string, string>();

export const mockRespObj = (): Partial<Response> => {
  const resp: Partial<Response> = {
    setHeader: jest.fn().mockImplementation((name: string, headerValue: string) => {
      headers.set(name, headerValue);
    }),
    header: jest.fn().mockImplementation(name => {
      return headers.get(name);
    }),
    status: jest.fn().mockImplementation(code => {
      resp.status = code;
      return resp;
    }),
    sendStatus: jest.fn().mockImplementation(result => (resp.status = result)),
    json: jest.fn().mockImplementation(result => (resp.json = result)),
  };
  return resp;
};

