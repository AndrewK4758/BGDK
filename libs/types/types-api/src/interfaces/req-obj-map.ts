import { IAllGamesMap } from '@bgdk/all-games-map';
import { Chain } from '@bgdk/chain';
import { IBuiltGame } from '@bgdk/game-builder';
import { GameNameString } from '@bgdk/types-game';
import { Request } from 'express';
import { LoginData } from '../types/login-data';
import { IInstanceTimeMap } from './instance-time-map';
import { IInstanceOfGame } from '@bgdk/instance-of-game';

export interface IReqObjMaps extends Request {
  allGamesMap: IAllGamesMap;
  instanceMap: IInstanceTimeMap;
  gameSpecificChain: Chain;
  selectedGameName: GameNameString;
  selectedGame: IBuiltGame;
  loginData: LoginData;
  activeGameInstance: IInstanceOfGame;
}
