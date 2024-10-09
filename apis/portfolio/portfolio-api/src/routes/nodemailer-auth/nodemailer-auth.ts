import { Router } from 'express';
import auth from '../../controllers/nodemail-auth/auth.ts';
import token from '../../controllers/nodemail-auth/token.ts';

const authRouter: Router = Router();

authRouter.get('/auth', auth);

authRouter.get('/redirect', token);

export default authRouter;
