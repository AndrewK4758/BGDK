import express, { Request, Response, Router } from 'express';
import loginUser from '../controllers/login-user.js';
import performAction from '../controllers/perform_action_context_object.js';
import populateInstanceMaps from '../controllers/populate_instance_map.js';
import registerUser from '../controllers/register-user.js';
import sendGameList from '../controllers/send_game_list.js';
import validateUser from '../controllers/validate-user.js';
import middlewareRouter from '../middleware/request-filter.js';
import multer from 'multer';

const router: Router = Router();

const uploadStorage = multer.memoryStorage();
const upload = multer({ storage: uploadStorage });

export class GameRoutes {
  constructor() {
    // ROUTER MIDDLEWARE
    router.use(express.json());
    router.use(express.urlencoded({ extended: true }));
    router.use('/games', middlewareRouter);
    // ENDPOINTS
    router.get('/validate-user', validateUser);
    router.post('/register-user', upload.single('thumbnail'), registerUser);
    router.patch('/login', loginUser);
    router.get('/games', sendGameList);
    router.post('/games/:id', populateInstanceMaps);
    router.patch('/games/:id/:action', (req: Request, resp: Response) => performAction(req, resp, null, null));
    router.patch('/join-game', (req: Request, resp: Response) => performAction(req, resp, null, null));
  }
}

export default router;
