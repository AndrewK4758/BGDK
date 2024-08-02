import { IReqObjMaps } from '@bgdk/types-api';
import { Response, NextFunction } from 'express';
import gameNotInList from '../../errors/game-not-in-list';
import { mockReqObj, mockRespObj } from '__mocks__/mocks';
import useSelectedGame from '../../middleware/use-selected-game';

let req: Partial<IReqObjMaps>, resp: Partial<Response>, next: NextFunction;

describe('Test use selected game middleware', () => {
  beforeAll(() => {
    req = mockReqObj() as Partial<IReqObjMaps>;
    resp = mockRespObj();
    next = jest.fn();

    req.selectedGameName = 'Chutes & Ladders';
  });
  it('Should pass and add the BuiltGame to the req object', () => {
    useSelectedGame(req as IReqObjMaps, resp as Response, next);

    expect(req.selectedGame).toBeTruthy();
    expect(req.selectedGame.name).toEqual(req.selectedGameName);
  });

  it('Should pass and return an error message and 404 status', () => {
    req.selectedGameName = 'Not In List';

    useSelectedGame(req as IReqObjMaps, resp as Response, next);

    expect(resp.status).toEqual(404);
    expect(resp.json).toEqual(gameNotInList());
  });
});
