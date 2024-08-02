import { Response, NextFunction } from 'express';
import { IReqObjMaps } from '@bgdk/types-api';
import useSetSelectedGameName from '../middleware/set-game-name';
import { mockReqObj, mockRespObj } from '__mocks__/mocks';

let req: Partial<IReqObjMaps>, resp: Partial<Response>, next: NextFunction;

describe('Test use selected game name middleware', () => {
  beforeAll(() => {
    req = mockReqObj() as Partial<IReqObjMaps>;
    resp = mockRespObj();
    next = jest.fn();

    req.params['id'] = 'Game-Name-To-Test';
  });

  it('Should pass and remove the dashes in the id property', async () => {
    await useSetSelectedGameName(req as IReqObjMaps, resp as Response, next);

    expect(req.selectedGameName).toEqual('Game Name To Test');
  });
});
