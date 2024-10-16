import { Request, Router, Response, NextFunction } from 'express';
import { GameNameString, PlayerID } from '@bgdk/types-game';
import useSetSelectedGameName from './set-selected-game-name.js';
import usePlayerID from './use-player-id.js';
import useSelectedGame from './use-selected-game.js';
import useAllGamesMap from './all-games-map.js';
import useInstanceTimeMap from './instance-map.js';
import useActiveGameInstance from './use-active-game-instancce.js';
import type { IBuiltGame } from '@bgdk/game-builder';

const reqFilter = (req: Request, _resp: Response, next: NextFunction): void => {
  req.playerID = usePlayerID(req) as PlayerID;
  req.selectedGameName = useSetSelectedGameName(req) as GameNameString;
  req.selectedGame = useSelectedGame(req);
  req.allGamesMap = useAllGamesMap();
  req.instanceMap = useInstanceTimeMap();
  req.activeGameInstance = useActiveGameInstance(req);
  req.gameSpecificChain = (req.selectedGame as IBuiltGame).chain ?? null;
  next();
};

const middlewareRouter: Router = Router();

middlewareRouter.use('/:id', reqFilter);

export default middlewareRouter;
