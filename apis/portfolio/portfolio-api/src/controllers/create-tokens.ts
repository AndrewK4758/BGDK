import type { NextFunction, Request, Response } from 'express';
import * as fs from 'fs/promises';
import { join } from 'path';
import { cwd } from 'process';
import oauth2Client from '../services/google-oauth.ts';

const PATH_FOR_TOKENS = join(cwd(), 'apis/portfolio/portfolio-api/tokens/');



const createTokens = async (req: Request, resp: Response, next: NextFunction) => {
  try {
    const { code } = req.body;

    const { tokens } = await oauth2Client.getToken(code);

    console.log(tokens);

    await fs.writeFile(`${PATH_FOR_TOKENS}trial.json`, JSON.stringify(tokens));

    resp.sendStatus(201);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default createTokens;
