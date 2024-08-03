import { Request, Response } from 'express';
import updateArtist from '../services/prisma/artist/update-artists';
import updateArtistError from '../errors/update-artist-error';

const updateArtists = async (req: Request, resp: Response): Promise<void> => {
  const { artist_id, name } = req.body;

  const updatedArtist = await updateArtist(artist_id, name);

  const output = {
    updatedArtist: updatedArtist,
  };

  updatedArtist ? resp.status(202).json(output) : resp.status(400).json(updateArtistError());
};

export default updateArtists;
