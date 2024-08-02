import { IReqObjMaps } from '@bgdk/types-api';
import express, { NextFunction, Request, Response, Router } from 'express';
import performAction from '../controllers/perform_action_context_object';
import populateInstanceMaps from '../controllers/populate_instance_map';
import sendGameList from '../controllers/send_game_list';
import useAllGamesMap from '../middleware/all-games-map';
import useInstanceTimeMap from '../middleware/instance-map';
import useGameSpecificChain from '../middleware/use-game-specific-chain';
import useSetSelectedGameName from '../middleware/set-game-name';
import useSelectedGame from '../middleware/use-selected-game';

export default class GameRoutes {
  constructor(router: Router) {
    // ROUTER MIDDLEWARE
    router.use(express.json());
    router.use('/games/:id', useSetSelectedGameName);
    router.use('/games/:id', useSelectedGame);
    router.use('/games/:id', useAllGamesMap);
    router.use('/games/:id', useInstanceTimeMap);
    router.use('/games/:id/:action', useGameSpecificChain);
    // ENDPOINTS
    router.get('/games', sendGameList);
    router.post('/games/:id', populateInstanceMaps);
    router.patch('/games/:id/:action', (req: IReqObjMaps, resp: Response) => performAction(req, resp, null, null));
    router.patch('/join-game', (req: IReqObjMaps, resp: Response) => performAction(req, resp, null, null));

    // GAE HEALH CHECKS
    router.all('/readiness_check', (err: Error, _req: Request, resp: Response, next: NextFunction) => {
      if (err) {
        console.log(err);
      } else {
        resp.status(200).send('Readiness ChecK: READY TO GO');
      }
      next();
    });

    router.all('/liveness_check', (err: Error, _req: Request, resp: Response, next: NextFunction) => {
      if (err) {
        console.log(err);
      } else {
        resp.status(200).send('Liveness Check: STILL LIVING');
      }
      next();
    });
  }
}

