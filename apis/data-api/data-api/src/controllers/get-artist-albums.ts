import { Prisma } from '@prisma/client';
import getArtistAlbums from '../services/prisma/album/get-artist-albums';
import { NextFunction, Request, Response } from 'express';
import { DefaultArgs } from '@prisma/client/runtime/library';

const getArtistsAlbums = async (req: Request, resp: Response, next: NextFunction): Promise<void> => {
  if (!req.query.title && req.query.artistID) {
    try {
      const artistID = parseInt(req.query.artistID as string, 10);

      const query = {
        where: { artist_id: artistID },
      } as Prisma.albumFindManyArgs<DefaultArgs>;

      const albums = await getArtistAlbums(query);

      resp.status(200).json({ albums: albums });
    } catch (err) {
      console.error(err);
    }
  } else next();
};

export default getArtistsAlbums;
