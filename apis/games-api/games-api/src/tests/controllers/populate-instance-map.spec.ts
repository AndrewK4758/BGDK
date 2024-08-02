import { AllGamesMap } from '@bgdk/all-games-map';
import { IReqObjMaps } from '@bgdk/types-api';
import { mockReqObj, mockRespObj } from '__mocks__/mocks';
import { Response } from 'express';
import populateInstanceMaps from '../controllers/populate_instance_map';
import { InstanceTimeMap } from '../services/instance-time-map/instance-time-map';
import games from '../data/games-list';

let req: Partial<IReqObjMaps>, resp: Partial<Response>;

describe('Test populating game instance map with correct game instance', () => {
  beforeEach(() => {
    req = mockReqObj() as Partial<IReqObjMaps>;
    resp = mockRespObj();

    req.selectedGameName = 'Chutes & Ladders';
    req.selectedGame = games.find(({ name }) => name === req.selectedGameName);
    req.allGamesMap = new AllGamesMap();
    req.instanceMap = new InstanceTimeMap();
  });

  it('should pass and return status of 201', async () => {
    await populateInstanceMaps(req as IReqObjMaps, resp as Response);

    expect(resp.status).toEqual(201);
    expect(resp.header('current-game')).toBeTruthy();
  });
});
