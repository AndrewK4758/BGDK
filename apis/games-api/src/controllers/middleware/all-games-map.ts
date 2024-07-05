import { AllGamesMap } from '@bgdk/all-games-map';
import { IReqObjMaps } from '@bgdk/types-api';
import { NextFunction, Response } from 'express';

export const allGamesMap = new AllGamesMap();

const useAllGamesMap = (req: IReqObjMaps, resp: Response, next: NextFunction) => {
  req.allGamesMap = allGamesMap;
  next();
};

export default useAllGamesMap;
