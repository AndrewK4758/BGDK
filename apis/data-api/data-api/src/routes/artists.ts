import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getArtisis = async (req: Request, resp: Response) => {
  const allArtists = await prisma.artist.findMany();

  resp.status(200).json(allArtists);
};

export default getArtisis;
