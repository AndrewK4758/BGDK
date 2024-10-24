import { Router, json, urlencoded } from 'express';
import promptBuilder from '../controllers/prompt-builder';
import generateImages from '../controllers/gen-ai-image-gen';

const router: Router = Router();

export class Routes {
  constructor() {
    router.use(json());
    router.use(urlencoded({ extended: true }));

    router.post('/build-prompt', promptBuilder);
    router.post('images', generateImages);
  }
}

export default router;
