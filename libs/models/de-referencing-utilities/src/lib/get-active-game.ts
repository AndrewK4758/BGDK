import { IAllGamesMap } from '@bgdk/all-games-map';
import { InstanceOfGame } from '@bgdk/instance-of-game';
import { IReqObjMaps } from '@bgdk/types-api';
import { GameInstanceID, GamePlayerValidation } from '@bgdk/types-game';

export const getActiveGame = (req: IReqObjMaps) => {
  const __current_game__ = JSON.parse(req.header('current-game') as string) as GamePlayerValidation;

  const gameInstanceID = __current_game__.gameInstanceID as GameInstanceID;

  return req.allGamesMap.AllGames.get(gameInstanceID) as InstanceOfGame;
};

export const getActiveGameWS = (gameID: GameInstanceID, allGamesMap: IAllGamesMap) =>
  allGamesMap.AllGames.get(gameID) as InstanceOfGame;
