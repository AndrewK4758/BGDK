import express, { Router } from 'express';
import getReq from '../controllers/home-page';
import postEmail from '../controllers/post-email';
import multer from 'multer';

const router: Router = Router();

export const uploadStorage = multer.memoryStorage();
export const upload = multer({ storage: uploadStorage });

export class PortfolioRoutes {
  constructor() {
    router.use(express.json());
    router.use(express.urlencoded({ extended: true }));
    //-------------------------------------------------//
    router.get('/', getReq);
    router.post('/email', upload.single('attachment'), postEmail);
  }
}

export default router;
