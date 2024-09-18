import { Router } from 'express';
import getReq from '../controllers/home-page';

const router: Router = Router();

export class PortfolioRoutes {
  constructor() {
    router.get('/', getReq);
  }
}

export default router;
