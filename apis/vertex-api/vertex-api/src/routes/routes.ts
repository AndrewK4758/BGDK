import { Router, json, urlencoded } from 'express';
import promptBuilder from '../controllers/prompt-builder.ts';
// import multer, { memoryStorage } from 'multer';

const router: Router = Router();

// const memStore = memoryStorage();
// const files = multer({ storage: memStore });

export class Routes {
  constructor() {
    router.use(json());
    router.use(urlencoded({ extended: true }));
    router.post('/build-prompt', promptBuilder);
  }
}

export default router;
