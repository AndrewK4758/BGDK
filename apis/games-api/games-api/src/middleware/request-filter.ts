import { Router, Response, NextFunction } from 'express';
import { IReqObjMaps } from '@bgdk/types-api';
import { GameNameString, PlayerID } from '@bgdk/types-game';
import useSetSelectedGameName from './set-selected-game-name';
import usePlayerID from './use-player-id';
import useSelectedGame from './use-selected-game';
import useAllGamesMap from './all-games-map';
import useInstanceTimeMap from './instance-map';
import useActiveGameInstance from './use-active-game-instancce';

const reqFilter = (req: IReqObjMaps, _resp: Response, next: NextFunction): void => {
  req.playerID = usePlayerID(req) as PlayerID;
  req.selectedGameName = useSetSelectedGameName(req) as GameNameString;
  req.selectedGame = useSelectedGame(req);
  req.allGamesMap = useAllGamesMap();
  req.instanceMap = useInstanceTimeMap();
  req.activeGameInstance = useActiveGameInstance(req);
  req.gameSpecificChain = req.selectedGame.chain;
  next();
};

const middlewareRouter: Router = Router();

middlewareRouter.use('/:id', reqFilter);

export default middlewareRouter;
