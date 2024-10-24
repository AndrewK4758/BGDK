import type { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import validateArtist from '../services/prisma/artist/validate-artist-in-db';

const validateArtists = async (req: Request, resp: Response) => {
  try {
    const { name } = req.query;

    const query = {
      where: { name: { equals: name as string, mode: 'insensitive' } },
    } as Prisma.artistWhereInput;

    const artist = await validateArtist(query);

    if (artist) resp.status(200).json({ message: 'Artist Already Exists' });
    else resp.status(200).json({ message: 'Artist Not in List' });
  } catch (error) {
    console.error(error);
  }
};

export default validateArtists;
