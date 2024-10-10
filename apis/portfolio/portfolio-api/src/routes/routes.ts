import express, { Router } from 'express';
import multer from 'multer';
import getReq from '../controllers/home-page.ts';
import postEmail from '../controllers/post-email.ts';
import createTokens from '../controllers/create-tokens.ts';
import authRouter from './nodemailer-auth/nodemailer-auth.ts';
import createEvents from '../controllers/calendar/create-event.ts';

const router: Router = Router();

export const uploadStorage = multer.memoryStorage();
export const upload = multer({ storage: uploadStorage });

export class PortfolioRoutes {
  constructor() {
    router.use(express.json());
    router.use(express.urlencoded({ extended: true }));
    //-------------------------------------------------//
    router.use('/', authRouter);
    router.get('/', getReq);
    router.post('/email', upload.single('attachment'), postEmail);
    router.post('/create-tokens', createTokens);
    router.post('/create-events', createEvents);
  }
}

export default router;
