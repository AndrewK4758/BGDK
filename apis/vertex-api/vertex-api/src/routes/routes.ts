import { Router, json, urlencoded } from 'express';
import pythonRouter from '../python/spawn-python-process';
import promptBuilder from '../controllers/prompt-builder';
import generateImages from '../controllers/gen-ai-image-gen';
import multer from 'multer';

const router: Router = Router();

export const uploadStorage = multer.memoryStorage();
export const upload = multer({ storage: uploadStorage });

export class Routes {
  constructor() {
    router.use(json({ limit: '10mb' }));
    router.use(urlencoded({ extended: true, limit: '10mb' }));
    router.use('/agents', pythonRouter);

    router.post('/build-prompt', upload.single('document'), promptBuilder);
    router.post('/images', generateImages);
  }
}

export default router;
