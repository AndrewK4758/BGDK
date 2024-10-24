import { GameNameString, IBuiltGame, PlayerID } from '@bgdk/types-game';
import { NextFunction, Request, Response, Router } from 'express';
import useAllGamesMap from './all-games-map';
import useInstanceTimeMap from './instance-map';
import useSetSelectedGameName from './set-selected-game-name';
import useActiveGameInstance from './use-active-game-instancce';
import usePlayerID from './use-player-id';
import useSelectedGame from './use-selected-game';

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
