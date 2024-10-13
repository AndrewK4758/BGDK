import { Request, Router, Response, NextFunction } from 'express';
// import { IReqObjMaps } from '@bgdk/types-api';
// import { IReqObjMaps } from '../types/types.js';
import { GameNameString, PlayerID } from '@bgdk/types-game';
import useSetSelectedGameName from './set-selected-game-name.ts';
import usePlayerID from './use-player-id.ts';
import useSelectedGame from './use-selected-game.ts';
import useAllGamesMap from './all-games-map.ts';
import useInstanceTimeMap from './instance-map.ts';
import useActiveGameInstance from './use-active-game-instancce.ts';

const reqFilter = (req: Request, _resp: Response, next: NextFunction): void => {
  req.playerID = usePlayerID(req) as PlayerID;
  req.selectedGameName = useSetSelectedGameName(req) as GameNameString;
  req.selectedGame = useSelectedGame(req);
  req.allGamesMap = useAllGamesMap();
  req.instanceMap = useInstanceTimeMap();
  req.activeGameInstance = useActiveGameInstance(req);
  req.gameSpecificChain = req.selectedGame.chain ?? null;
  next();
};

const middlewareRouter: Router = Router();

middlewareRouter.use('/:id', reqFilter);

export default middlewareRouter;
