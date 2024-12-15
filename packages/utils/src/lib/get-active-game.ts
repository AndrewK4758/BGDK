import { Request } from 'express';
import { GameInstanceID, GamePlayerValidation, IInstanceOfGame } from '@bgdk/types-game';

export const getActiveGame = (req: Request) => {
  const __current_game__ = JSON.parse(req.header('current-game') as string) as GamePlayerValidation;

  const gameInstanceID = __current_game__.gameInstanceID as GameInstanceID;

  return req.allGamesMap.AllGames.get(gameInstanceID) as IInstanceOfGame;
};
