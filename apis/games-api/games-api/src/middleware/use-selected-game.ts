import { IBuiltGame } from '@bgdk/game-builder';
import { IReqObjMaps } from '@bgdk/types-api';
import { Response, NextFunction } from 'express';
import games from '../data/games-list';
import gameNotInList from '../errors/game-not-in-list';

const useSelectedGame = async (req: IReqObjMaps, resp: Response, next: NextFunction): Promise<void> => {
  const selectedGame: IBuiltGame = games.find(({ name }) => name === req.selectedGameName);
  if (selectedGame) {
    console.log(`Game Found In List: ${req.selectedGameName} `);
    req.selectedGame = selectedGame;
    next();
  } else {
    console.log('Game name sent in the req params is not in the list of games');
    resp.status(404).json(gameNotInList());
  }
};

export default useSelectedGame;
