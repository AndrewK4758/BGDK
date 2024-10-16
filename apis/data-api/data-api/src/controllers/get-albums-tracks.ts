import { NextFunction, Request, Response } from 'express';
import getAlbumTracks from '../services/prisma/tracks/get-album-tracks.js';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import albumTracksCount from '../services/prisma/tracks/album-tracks-count.js';

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
