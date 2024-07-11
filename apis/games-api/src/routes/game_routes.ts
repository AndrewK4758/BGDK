import express, { NextFunction, Router, Request, Response } from 'express';
import performAction from '../controllers/perform_action_context_object';
import populateInstanceMaps from '../controllers/populate_instance_map';
import sendGameList from '../controllers/send_game_list';

export default class GameRoutes {
  constructor(router: Router) {
    router.use(express.json());

    router.get('/games', sendGameList);
    router.post('/games/:id', populateInstanceMaps);
    router.patch('/games/:id/:action', performAction);
    router.patch('/join-game', performAction);

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
//enable appEngine and authorization/authentication ask for example yaml file
