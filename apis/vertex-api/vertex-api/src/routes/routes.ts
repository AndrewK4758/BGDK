import { Router, json, urlencoded } from 'express';
import multer from 'multer';
import generateImages from '../controllers/gen-ai-image-gen';
import promptBuilder from '../controllers/prompt-builder';

const router: Router = Router();

export const uploadStorage = multer.memoryStorage();
export const upload = multer({ storage: uploadStorage });

export class Routes {
  constructor() {
    router.use(json({ limit: '10mb' }));
    router.use(urlencoded({ extended: true, limit: '10mb' }));

    router.post('/build-prompt', upload.single('document'), promptBuilder);
    router.post('/images', generateImages);
  }
}

export default router;
