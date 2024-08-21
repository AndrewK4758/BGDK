import { IReqObjMaps } from '@bgdk/types-api';
import express, { Response, Router } from 'express';
import loginUser from '../controllers/login-user';
import performAction from '../controllers/perform_action_context_object';
import populateInstanceMaps from '../controllers/populate_instance_map';
import registerUser from '../controllers/register-user';
import sendGameList from '../controllers/send_game_list';
import validateUser from '../controllers/validate-user';
import middlewareRouter from '../middleware/request-filter';
import multer from 'multer';
// import { fileURLToPath } from 'url';
// import path from 'path';

const router: Router = Router();

// const urlPath = fileURLToPath();
// const __dirname = path.dirname(urlPath);
// console.log(__dirname);
const uploadStorage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, `./apis/games-api/games-api/src/data/thumbnails`);
  },
  filename(req, file, callback) {
    callback(null, `${new Date().getDate()} - ${file.originalname}`);
  },
});
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
    router.patch('/games/:id/:action', (req: IReqObjMaps, resp: Response) => performAction(req, resp, null, null));
    router.patch('/join-game', (req: IReqObjMaps, resp: Response) => performAction(req, resp, null, null));
  }
}

export default router;
