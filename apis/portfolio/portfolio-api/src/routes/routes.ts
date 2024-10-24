import express, { Router } from 'express';
import CookieParser from 'cookie-parser';
import multer from 'multer';
import getReq from '../controllers/home-page';
import postEmail from '../controllers/post-email';
import createTokens from '../controllers/create-google-tokens';
import createEvents from '../controllers/calendar/create-event';

const router: Router = Router();

export const uploadStorage = multer.memoryStorage();
export const upload = multer({ storage: uploadStorage });

export class PortfolioRoutes {
  constructor() {
    router.use(express.json());
    router.use(express.urlencoded({ extended: true }));
    router.use(CookieParser());
    //-------------------------------------------------//
    router.get('/', getReq);
    router.post('/email', upload.single('attachment'), postEmail);
    router.post('/create-tokens', createTokens);
    router.post('/create-events', createEvents);
  }
}

export default router;
