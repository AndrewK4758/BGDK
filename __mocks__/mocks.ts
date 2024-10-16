import type { Response } from 'express';
import { Color, type GamePlayerValidation, type IRegisterFormValues } from '../libs/types/types-game/src/index';
import type { IReqObjMaps } from '../libs/types/types-api/src/index';

export const mockReqObj = (): Partial<IReqObjMaps> => {
  const req: Partial<IReqObjMaps> = {
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
    json: jest.fn().mockImplementation(result => {
      resp.json = result;
      return resp;
    }),
  };
  return resp;
};
