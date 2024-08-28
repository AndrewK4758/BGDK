import { Request, Response } from 'express';
import { prisma } from '@bgdk/prisma';

const getArtistCount = async (_req: Request, resp: Response) => {
  try {
    const count = await prisma.artist.count();
    resp.status(200).json(count);
  } catch (err) {
    console.error(err);
  }
};

export default getArtistCount;
