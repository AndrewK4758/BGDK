import { Request } from 'express';
import { GamePlayerValidation } from '@aklapper/game-types';
import { IAllGamesMap } from '../all-games-map/all-games-map';
import { IInstanceOfGame } from '@aklapper/instance-of-game';

export const getActiveGame = (req: Request) => {
  const __current_game__ = JSON.parse(
    req.header('current-game') as string
  ) as GamePlayerValidation;

  const gameInstanceID = __current_game__.gameInstanceID as string;

  const allGamesMap = req.app.get('allGamesMap') as IAllGamesMap;
  return allGamesMap.AllGames.get(gameInstanceID) as IInstanceOfGame;
};
