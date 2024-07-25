import { IAllGamesMap } from '@bgdk/all-games-map';
import { Request } from 'express';
import { IInstanceTimeMap } from './instance-time-map';
import { Chain } from '@bgdk/chain';

export interface IReqObjMaps extends Request {
  allGamesMap: IAllGamesMap;
  instanceMap: IInstanceTimeMap;
  gameSpecificChain: Chain;
}
