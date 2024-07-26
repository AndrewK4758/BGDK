import { IReqObjMaps } from '@bgdk/types-api';
import games from '../controllers/list-games';
import { Response, NextFunction } from 'express';

const useGameSpecificChain = (req: IReqObjMaps, resp: Response, next: NextFunction) => {
  const gameName = req.params.id.replace(/-/g, ' ');
  const { chain } = games.find(({ name }) => name === gameName);
  req.gameSpecificChain = chain;
  next();
};

export default useGameSpecificChain;
