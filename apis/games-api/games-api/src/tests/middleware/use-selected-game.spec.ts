import { Request } from 'express';
import { mockReqObj } from '__mocks__/mocks.js';
import useSelectedGame from '../../middleware/use-selected-game.js';
import games from '../../data/games-list.js';
import type { IBuiltGame } from '@bgdk/game-builder';

let req: Partial<Request>;

describe('Test use selected game middleware', () => {
  beforeAll(() => {
    req = mockReqObj();

    req.selectedGame = games[0];
  });
  it('Should pass and add the BuiltGame to the req object', () => {
    useSelectedGame(req as Request);

    expect(req.selectedGame).toBeTruthy();
    expect((req.selectedGame as IBuiltGame).name).toEqual(games[0].name);
  });

  it('Should pass and return an error message and 404 status', () => {
    req.selectedGame = games[1];
    useSelectedGame(req as Request);

    expect(req.selectedGameName).not.toEqual('Chutes & Ladders');
  });
});
