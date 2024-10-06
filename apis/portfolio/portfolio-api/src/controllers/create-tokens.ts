import type { NextFunction, Request, Response } from 'express';
import oauth2Client from '../services/google-oauth';

const createTokens = async (req: Request, resp: Response, next: NextFunction) => {
  try {
    const { code } = req.body;

    const { tokens } = await oauth2Client.getToken(code);

    resp.status(201).json({ tokens });
  } catch (error) {
    console.error(error);
  }
};

export default createTokens;
