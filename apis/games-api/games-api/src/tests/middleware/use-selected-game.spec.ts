import { IReqObjMaps } from '@bgdk/types-api';
import { mockReqObj } from '__mocks__/mocks';
import useSelectedGame from '../../middleware/use-selected-game';
import games from '../../data/games-list';

let req: Partial<IReqObjMaps>;

describe('Test use selected game middleware', () => {
  beforeAll(() => {
    req = mockReqObj() as Partial<IReqObjMaps>;

    req.selectedGame = games[0];
  });
  it('Should pass and add the BuiltGame to the req object', () => {
    useSelectedGame(req as IReqObjMaps);

    expect(req.selectedGame).toBeTruthy();
    expect(req.selectedGame.name).toEqual(games[0].name);
  });

  it('Should pass and return an error message and 404 status', () => {
    req.selectedGame = games[1];
    useSelectedGame(req as IReqObjMaps);

    expect(req.selectedGameName).not.toEqual('Chutes & Ladders');
  });
});
