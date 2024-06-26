import { Request } from 'express';
import { GameInstanceID, GamePlayerValidation } from '@bgdk/game-types';
import { IAllGamesMap } from '@bgdk/all-games-map';
import { IInstanceOfGame } from '@bgdk/instance-of-game';

export const getActiveGame = (req: Request) => {
  const __current_game__ = JSON.parse(
    req.header('current-game') as string
  ) as GamePlayerValidation;

  const gameInstanceID = __current_game__.gameInstanceID as GameInstanceID;

  const allGamesMap = req.app.get('allGamesMap') as IAllGamesMap;
  return allGamesMap.AllGames.get(gameInstanceID) as IInstanceOfGame;
};

export const getActiveGameWS = (gameID: GameInstanceID, allGamesMap: IAllGamesMap) => allGamesMap.AllGames.get(gameID) as IInstanceOfGame;
;