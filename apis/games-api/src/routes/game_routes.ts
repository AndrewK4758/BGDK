import express, { Router } from 'express';
import { performAction } from '../controllers/perform_action_context_object';
import { populateInstanceMaps } from '../controllers/populate_instance_map';
import { sendGameList } from '../controllers/send_game_list';

export class GameRoutes {
  constructor(router: Router) {
    router.use(express.json());
    //----------------------------//
    router.get('/games', sendGameList);
    router.post('/games/:id', populateInstanceMaps);
    router.patch('/games/:id/:action', performAction);
    router.patch('/join-game', performAction);
  }
}

//enable appEngine and authorization/authentication ask for example yaml file