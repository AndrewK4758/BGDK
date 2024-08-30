import getArtistAlbums from '../services/prisma/album/get-artist-albums';
import { NextFunction, Request, Response } from 'express';

const getArtistsAlbums = async (req: Request, resp: Response, next: NextFunction): Promise<void> => {
  if (req.query.title) next();
  else {
    try {
      const { artistID } = req.query;
      const albums = await getArtistAlbums(parseInt(artistID as string, 10));

      resp.status(200).json({ albums: albums });
    } catch (err) {
      console.error(err);
    }
  }
};

export default getArtistsAlbums;
