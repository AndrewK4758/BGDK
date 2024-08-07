import { IAllGamesMap } from '@bgdk/all-games-map';
import { Chain } from '@bgdk/chain';
import { Request } from 'express';
import { IInstanceTimeMap } from './instance-time-map';
import { IBuiltGame } from '@bgdk/game-builder';
import { GameNameString } from '@bgdk/types-game';

export interface IReqObjMaps extends Request {
  allGamesMap: IAllGamesMap;
  instanceMap: IInstanceTimeMap;
  gameSpecificChain: Chain;
  selectedGameName: GameNameString;
  selectedGame: IBuiltGame;
}
