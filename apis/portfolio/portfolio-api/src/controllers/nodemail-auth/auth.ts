import type { Request, Response, NextFunction } from 'express';
import { type AuthorizationUrlRequest } from '@azure/msal-node';
import cca from '../../services/masl.ts';

const auth = async (_req: Request, resp: Response, next: NextFunction) => {
  try {
    const authCodeUrlParameters: AuthorizationUrlRequest = {
      scopes: ['mail.send'],
      redirectUri: process.env.MAIL_REDIRECT_URI,
      responseMode: 'query',
    };
    cca.getAuthCodeUrl(authCodeUrlParameters).then(code => {
      console.log('THIS IS THE RETURN VALUE FROM GETAUTHCODEURL CALL\n', code);
      // resp.redirect(code);
      resp.send(code);
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default auth;
