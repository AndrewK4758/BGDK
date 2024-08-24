import { Request, Response } from 'express';
import { prisma } from '@bgdk/prisma';

const getArtistCount = async (req: Request, resp: Response) => {
  try {
    const count = await prisma.artist.count();
    resp.json(count);
  } catch (err) {
    console.error(err);
  }
};

export default getArtistCount;
