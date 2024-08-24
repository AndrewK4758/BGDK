import { Request, Response } from 'express';
import findArtist from '../services/prisma/artist/find-artist';
import findArtistError from '../errors/find-artist-error';

const getArtist = async (req: Request, resp: Response) => {
  try {
    const artistID = req.params.id;

    const artist = await findArtist(parseInt(artistID));

    artist ? resp.status(200).json(artist) : resp.status(404).json(findArtistError());
  } catch (error) {
    console.error(error);
  }
};

export default getArtist;
