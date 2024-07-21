import { Request, Response } from 'express';
import { Color, GamePlayerValidation, IRegisterFormValues } from '../libs/types/types-game/src';

export const mockReqObj: Partial<Request> = {
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

export const mockRespObj: Partial<Response> = {
  setHeader: jest.fn().mockImplementation((name: string, headerValue: string) => {
    const headers = new Map<string, string>();

    headers.set(name, headerValue);
  }),
  status: jest.fn().mockImplementation(code => {
    mockRespObj.status = code;
    return mockRespObj;
  }),
  sendStatus: jest.fn().mockImplementation(result => (mockRespObj.status = result)),
  json: jest.fn().mockImplementation(result => (mockRespObj.json = result)),
};


