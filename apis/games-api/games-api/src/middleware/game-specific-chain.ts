import { IReqObjMaps } from '@bgdk/types-api';
import games from '../data/games-list';
import { Response, NextFunction } from 'express';

const useGameSpecificChain = (req: IReqObjMaps, _resp: Response, next: NextFunction): void => {
  const gameName = req.selectedGameName;
  const { chain } = games.find(({ name }) => name === gameName);
  req.gameSpecificChain = chain;
  next();
};

export default useGameSpecificChain;
