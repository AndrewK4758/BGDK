import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const postArtists = async (req: Request, resp: Response): Promise<void> => {
  const { name } = req.body;

  const newArtist = await prisma.artist.create({
    data: {
      name: name,
    },
  });

  const output = {
    newArtist: newArtist,
  };
  newArtist !== undefined || null ? resp.status(201).json(output) : resp.status(400).json({ newArtist: undefined });
};

export default postArtists;
