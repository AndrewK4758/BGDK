import { NextFunction, Request, Response } from 'express';
import { prisma } from '@bgdk/prisma';

const getArtistCount = async (req: Request, resp: Response, next: NextFunction) => {
  if (!req.query.count) next();
  else {
    try {
      const count = await prisma.artist.count();

      resp.status(200).json({ count: count });
    } catch (err) {
      console.error(err);
    }
  }
};

export default getArtistCount;
