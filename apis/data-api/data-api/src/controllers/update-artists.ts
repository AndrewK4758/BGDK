import { Request, Response } from 'express';
import updateArtistError from '../errors/update-artist-error';
import updateArtist from '../services/prisma/artist/update-artists';

const updateArtists = async (req: Request, resp: Response): Promise<void> => {
  try {
    const { artistID, name } = req.body;

    const updatedArtist = await updateArtist(artistID, name);

    const output = {
      updatedArtist: updatedArtist,
    };

    if (updatedArtist) resp.status(202).json(output);
    else resp.status(400).json(updateArtistError());
  } catch (err) {
    console.error(err);
  }
};

export default updateArtists;
