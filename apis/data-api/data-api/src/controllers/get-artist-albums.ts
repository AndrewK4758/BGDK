import getArtistAlbums from '../services/prisma/album/get-artist-albums';
import { Request, Response } from 'express';

const getArtistsAlbums = async (req: Request, resp: Response): Promise<void> => {
  const artistID = req.params.id;

  try {
    const albums = await getArtistAlbums(parseInt(artistID));

    resp.status(200).json(albums);
  } catch (err) {
    console.error(err);
  }
};

export default getArtistsAlbums;
