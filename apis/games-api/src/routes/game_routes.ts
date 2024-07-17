import express, { NextFunction, Router, Request, Response } from 'express';
import performAction from '../controllers/perform_action_context_object';
import populateInstanceMaps from '../controllers/populate_instance_map';
import sendGameList from '../controllers/send_game_list';
import { IReqObjMaps } from '@bgdk/types-api';

export default class GameRoutes {
  constructor(router: Router) {
    router.use(express.json());

    router.get('/games', sendGameList);
    router.post('/games/:id', populateInstanceMaps);
    router.patch('/games/:id/:action', (req: IReqObjMaps, resp: Response)=>performAction(req, resp, undefined, undefined));
    router.patch('/join-game', (req: IReqObjMaps, resp: Response)=>performAction(req, resp, undefined, undefined));

    // GAE HEALH CHECKS
    router.all('/readiness_check', (err: Error, req: Request, resp: Response, next: NextFunction) => {
      if (err) {
        console.log(err);
      } else {
        resp.status(200).send('Readiness ChecK: READY TO GO');
      }
      next();
    });

    router.all('/liveness_check', (err: Error, req: Request, resp: Response, next: NextFunction) => {
      if (err) {
        console.log(err);
      } else {
        resp.status(200).send('Liveness Check: STILL LIVING');
      }
      next();
    });
  }
}

