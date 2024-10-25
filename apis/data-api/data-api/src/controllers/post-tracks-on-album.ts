import { Prisma, track } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';
import createTracks from '../services/prisma/tracks/create-tracks';

const createTracksOnAlbum = async (req: Request, resp: Response) => {
  try {
    const { name, albumID } = req.body;

    const query = { data: { name: name, album_id: albumID } } as Prisma.trackCreateArgs<DefaultArgs>;

    const newTrack: track = await createTracks(query);

    resp.status(200).json({ newTrack: newTrack });
  } catch (error) {
    console.error(error);
  }
};

export default createTracksOnAlbum;
