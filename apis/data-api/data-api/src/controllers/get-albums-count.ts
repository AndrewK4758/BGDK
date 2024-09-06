import { NextFunction, Request, Response } from 'express';
import { prisma } from '@bgdk/prisma';

const getAlbumsCount = async (req: Request, resp: Response, next: NextFunction) => {
  if (req.query.count) {
    try {
      const count = await prisma.album.count();
      resp.status(200).json({ count: count });
    } catch (err) {
      console.error(err);
    }
  } else next();
};

export default getAlbumsCount;
