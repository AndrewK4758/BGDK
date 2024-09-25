import express, { Router } from 'express';
import multer from 'multer';
import getReq from '../controllers/home-page';
import postEmail from '../controllers/post-email';

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