import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { NextFunction, Request, Response } from 'express';
import albumTracksCount from '../services/prisma/tracks/album-tracks-count';
import getAlbumTracks from '../services/prisma/tracks/get-album-tracks';

/**
 * Middleware function that retrieves tracks for an album and their count.
 *
 * This function checks if the `name` query parameter is present. If it is, it passes control to the next middleware function. Otherwise, it retrieves the `albumID` from the query parameters, fetches the tracks associated with that album from the database using Prisma, counts the tracks, and sends the tracks and their count as a JSON response.
 *
 * @param req - The Express request object.
 * @param resp - The Express response object.
 * @param next - The next middleware function in the chain.
 * @returns No explicit return value. It either sends a JSON response with the tracks and their count or calls the `next()` middleware function.
 */

const getAlbumsTracks = async (req: Request, resp: Response, next: NextFunction) => {
  if (req.query.name) next();
  else {
    try {
      const albumID = parseInt(req.query.albumID as string, 10);

      const query = {
        where: { album_id: { equals: albumID } },
      } as Prisma.trackFindManyArgs<DefaultArgs>;

      const tracks = await getAlbumTracks(query);
      const tracksCount = await albumTracksCount(albumID);

      resp.status(200).json({ tracks: tracks, count: tracksCount });
    } catch (error) {
      console.error(error);
    }
  }
};

export default getAlbumsTracks;
