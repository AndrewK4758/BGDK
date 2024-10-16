import { Request, Response } from 'express';
import createArtists from '../services/prisma/artist/create-artists.js';
import createArtistsError from '../errors/create-artist-error.js';

const postArtists = async (req: Request, resp: Response): Promise<void> => {
  const { name } = req.body;
  try {
    await createArtists(name);
    resp.status(201).json('Artist Sucessfully Added');
  } catch (error) {
    console.error(error);
    resp.status(400).json(createArtistsError());
  }
};

export default postArtists;
