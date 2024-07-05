import { IAllGamesMap } from '@bgdk/all-games-map';
import { Request } from 'express';
import { IInstanceTimeMap } from './i-instance-time-map';

export interface IReqObjMaps extends Request {
  allGamesMap: IAllGamesMap;
  instanceMap: IInstanceTimeMap;
}
