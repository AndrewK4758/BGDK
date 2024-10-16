import { NextFunction, Request, Response } from 'express';
import findArtistError from '../errors/find-artist-error.js';
import findArtists from '../services/prisma/artist/find-artists.js';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

const getArtists = async (req: Request, resp: Response, next: NextFunction): Promise<void> => {
  if (!req.query.take) next();
  else {
    try {
      const { take, skip, cursor } = req.query;

      const query = {
        take: parseInt(take as string, 10),
        skip: parseInt(skip as string, 10),
        cursor: { artist_id: parseInt(cursor as string, 10) },
      } as Prisma.artistFindManyArgs<DefaultArgs>;

      const allArtists = await findArtists(query);
      console.log(allArtists);
      resp.status(200).json({ allArtists: allArtists });
    } catch (err) {
      console.error(err);
      resp.status(404).json(findArtistError());
    }
  }
};
export default getArtists;
