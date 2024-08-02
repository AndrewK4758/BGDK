import { IReqObjMaps } from '@bgdk/types-api';
import { Response, NextFunction } from 'express';
import { mockReqObj, mockRespObj } from '__mocks__/mocks';
import noChainOrFunctionalityOnBuiltGame from '../../errors/no-game-functionality-chain';
import games from '../../data/games-list';
import useGameSpecificChain from '../../middleware/use-game-specific-chain';

let req: Partial<IReqObjMaps>, resp: Partial<Response>, next: NextFunction;

describe('Test use selected game middleware', () => {
  beforeAll(() => {
    req = mockReqObj() as Partial<IReqObjMaps>;
    resp = mockRespObj();
    next = jest.fn();

    req.selectedGameName = 'Chutes & Ladders';
    req.selectedGame = games.find(({ name }) => name === req.selectedGameName);
  });

  it('Should pass and add the chain to the found game on the req object', () => {
    useGameSpecificChain(req as IReqObjMaps, resp as Response, next);

    expect(req.gameSpecificChain).toBeTruthy();
  });

  it('Should pass and respond with a 404 error and error message', () => {
    req.selectedGameName = 'Not In List';
    req.selectedGame = games.find(({ name }) => name === req.selectedGameName);

    useGameSpecificChain(req as IReqObjMaps, resp as Response, next);

    expect(resp.status).toEqual(404);
    expect(resp.json).toEqual(noChainOrFunctionalityOnBuiltGame());
  });
});
