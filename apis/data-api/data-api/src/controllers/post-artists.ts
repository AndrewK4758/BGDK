import { Request, Response } from 'express';
import createArtists from '../services/prisma/artist/create-artists';
import createArtistsError from '../errors/create-artist-error';

const postArtists = async (req: Request, resp: Response): Promise<void> => {
  const { name } = req.body;

  const newArtist = await createArtists(name);

  const output = {
    newArtist: newArtist,
  };
  newArtist ? resp.status(201).json(output) : resp.status(400).json(createArtistsError());
};

export default postArtists;
