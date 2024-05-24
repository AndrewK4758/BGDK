import { GamePlayerValidation, IAllGamesMap, InstanceOfGame } from '@aklapper/model';
import { Request } from 'express';

export const getActiveGame = (req: Request) => {
  const __current_game__ = JSON.parse(req.header('__current_game__')) as GamePlayerValidation;

  const gameInstanceID = __current_game__.gameInstanceID;

  const allGamesMap = req.app.get('allGamesMap') as IAllGamesMap;
  return allGamesMap.AllGames.get(gameInstanceID) as InstanceOfGame;
};

export const getPlayerID = (req: Request) => {
  const __current_game__ = JSON.parse(req.header('__current_game__')) as GamePlayerValidation;
  return __current_game__.playerID;
};
