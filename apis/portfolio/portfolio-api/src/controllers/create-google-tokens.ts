import type { NextFunction, Request, Response } from 'express';
import oauth2Client from '../services/google-oauth';
import userTokensMap from '../models/users-tokens-map';
import ShortUniqueId from 'short-unique-id';

const createTokens = async (req: Request, resp: Response, next: NextFunction) => {
  try {
    const { code } = req.body;

    const { tokens } = await oauth2Client.getToken(code);

    const userID = new ShortUniqueId().rnd();

    userTokensMap.set(userID, tokens);

    resp.cookie('OAUID', userID, {
      maxAge: 1000 * 60 * 5,
      httpOnly: true,
    });

    resp.setHeader('Access-Control-Allow-Origin', 'http://www.andrew-k.us');
    resp.setHeader('Access-Control-Allow-Credentials', 'true');
    resp.status(201).json({ idToken: tokens.id_token });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default createTokens;
