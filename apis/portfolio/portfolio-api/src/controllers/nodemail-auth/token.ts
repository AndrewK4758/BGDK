import type { NextFunction, Request, Response } from 'express';
import { type AuthorizationCodeRequest } from '@azure/msal-node';
import cca from '../../services/masl.ts';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';

const PATH_FOR_TOKENS = join(cwd(), 'apis/portfolio/portfolio-api/tokens/nodemailer-auth.txt`');

const token = async (req: Request, resp: Response, next: NextFunction) => {
  console.log(req.query.code, 'in redirect endpoint');
  try {
    const tokenRequest: AuthorizationCodeRequest = {
      code: req.query.code as string,
      scopes: ['mail.send'],
      redirectUri: 'http://localhost:4700',
    };

    const tokenResp = await cca.acquireTokenByCode(tokenRequest);

    console.log(tokenResp);

    await writeFile(`${PATH_FOR_TOKENS}`, JSON.stringify(tokenResp));

    resp.send('finished');
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default token;
