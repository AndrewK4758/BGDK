import { AllGamesMap } from '@bgdk/all-games-map';
import { mockReqObj, mockRespObj } from '__mocks__/mocks.js';
import { Request, Response } from 'express';
import { InstanceTimeMap } from '../../services/instance-time-map/instance-time-map.js';
import games from '../../data/games-list.js';
import populateInstanceMaps from '../../controllers/populate_instance_map.js';

let req: Partial<Request>, resp: Partial<Response>;

describe('Test populating game instance map with correct game instance', () => {
  beforeEach(async () => {
    req = mockReqObj();
    resp = mockRespObj();

    req.selectedGameName = 'Chutes & Ladders';
    req.selectedGame = games.find(({ name }) => name === req.selectedGameName);
    req.allGamesMap = new AllGamesMap();
    req.instanceMap = new InstanceTimeMap();
  });

  it('should pass and return status of 201', async () => {
    await populateInstanceMaps(req as Request, resp as Response);

    expect(resp.status).toEqual(201);
    expect((resp as Response).header('current-game')).toBeTruthy();
  });
});
