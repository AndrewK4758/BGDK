import { AllGamesMap } from '@bgdk/all-games-map';
import { IReqObjMaps } from '@bgdk/types-api';
import { mockReqObj, mockRespObj } from '__mocks__/mocks';
import { Response } from 'express';
import populateInstanceMaps from '../controllers/populate_instance_map';
import { error } from '../errors/error';
import { InstanceTimeMap } from '../services/instance-time-map/instance-time-map';

let req: Partial<IReqObjMaps>, resp: Partial<Response>;

describe('Test populating game instance map with correct game instance', () => {
  beforeEach(() => {
    req = mockReqObj() as Partial<IReqObjMaps>;
    resp = mockRespObj();

    req.allGamesMap = new AllGamesMap();
    req.instanceMap = new InstanceTimeMap();
    req.params['id'] = 'Chutes-&-Ladders';
  });

  it('should pass and return status of 201', async () => {
    await populateInstanceMaps(req as IReqObjMaps, resp as Response);

    expect(resp.status).toEqual(201);
    expect(resp.header('current-game')).toBeTruthy();
  });

  it('should pass and returnn a status of 400 and an error', async () => {
    req.params['id'] = 'Not-A-Real-Game-Title';
    resp.setHeader('current-game', undefined);
    await populateInstanceMaps(req as IReqObjMaps, resp as Response);

    expect(resp.status).toEqual(400);
    expect(resp.json).toEqual(error());
    expect(resp.header('current-game')).toBeFalsy();
  });
});
