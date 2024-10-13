import { Request, Response } from 'express';
import findArtist from '../services/prisma/artist/find-artist.ts';
import findArtistError from '../errors/find-artist-error.ts';

const getArtist = async (req: Request, resp: Response) => {
  try {
    const artistID = req.params.id;

    const artist = await findArtist(parseInt(artistID, 10));

    if (artist) resp.status(200).json(artist);
    else resp.status(404).json(findArtistError());
  } catch (error) {
    console.error(error);
  }
};

export default getArtist;
