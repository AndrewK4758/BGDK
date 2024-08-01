import { IReqObjMaps } from '@bgdk/types-api';
import games from '../data/games-list';
import { Response, NextFunction } from 'express';
import noChainOrFunctionalityOnBuiltGame from '../errors/no-game-functionality-chain';

const useGameSpecificChain = (req: IReqObjMaps, resp: Response, next: NextFunction): void => {
  const gameName = req.selectedGameName;
  const { chain } = games.find(({ name }) => name === gameName);
  if (chain) {
    req.gameSpecificChain = chain;
    next();
  } else {
    resp.status(404).json(noChainOrFunctionalityOnBuiltGame());
  }
};

export default useGameSpecificChain;
