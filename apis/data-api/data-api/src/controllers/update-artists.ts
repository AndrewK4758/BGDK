import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const updateArtist = async (req: Request, resp: Response): Promise<void> => {
  const { artist_id, name } = req.body;

  const updatedArtist = await prisma.artist.update({
    where: { artist_id: artist_id },
    data: {
      name: name,
    },
  });

  const output = {
    updatedArtist: updatedArtist,
  };

  updatedArtist !== undefined || null
    ? resp.status(202).json(output)
    : resp.status(400).json({ updatedArtist: undefined });
};

export default updateArtist;
