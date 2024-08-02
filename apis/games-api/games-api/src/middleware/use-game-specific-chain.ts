import { IReqObjMaps } from '@bgdk/types-api';
import { NextFunction, Response } from 'express';
import noChainOrFunctionalityOnBuiltGame from '../errors/no-game-functionality-chain';

const useGameSpecificChain = (req: IReqObjMaps, resp: Response, next: NextFunction): void => {
  if (req.selectedGame) {
    req.gameSpecificChain = req.selectedGame.chain;
    next();
  } else {
    console.log('The chain prop does not exist on the selected BuiltGame');
    resp.status(404).json(noChainOrFunctionalityOnBuiltGame());
  }
};

export default useGameSpecificChain;
