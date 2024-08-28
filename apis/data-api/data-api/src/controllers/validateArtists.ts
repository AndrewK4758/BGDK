import { Request, Response } from 'express';
import validateArtist from '../services/prisma/artist/validate-artist-in-db';

const validateArtists = async (req: Request, resp: Response) => {
  try {
    const { name } = req.query;

    const query = {
      where: { name: { equals: name as string, mode: 'insensitive' } },
    };

    const artist = await validateArtist(query);

    artist
      ? resp.status(200).json({ message: 'Artist Already Exists' })
      : resp.status(200).json({ message: 'Artist Not in List. Please Submit to Continue' });
  } catch (error) {
    console.error(error);
  }
};

export default validateArtists;
