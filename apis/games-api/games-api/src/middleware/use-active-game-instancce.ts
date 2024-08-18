import { IReqObjMaps } from '@bgdk/types-api';
import { GamePlayerValidation } from '@bgdk/types-game';
import { NextFunction, Response } from 'express';

const useActiveGameInstance = (req: IReqObjMaps, resp: Response, next: NextFunction) => {
  if (req.header('current-game') && req.allGamesMap) {
    const { gameInstanceID } = JSON.parse(req.header('current-game')) as GamePlayerValidation;
    const game = req.allGamesMap.AllGames.get(gameInstanceID);
    if (game) {
      req.activeGameInstance = game;
      next();
    } else return resp.status(404).json({ errorMessage: 'No active game found' });
  } else {
    next();
    //figure out another error handler instead of this next call which negates the need to add
    //the active game instance to the req object
  }
};

export default useActiveGameInstance;
