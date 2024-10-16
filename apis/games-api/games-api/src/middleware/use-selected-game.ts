import { IBuiltGame } from '@bgdk/game-builder';
import games from '../data/games-list.js';
import type { Request } from 'express';

const useSelectedGame = (req: Request): IBuiltGame | undefined =>
  games.find(({ name }) => name === req.selectedGameName);

export default useSelectedGame;
