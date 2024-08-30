import { Request, Response } from 'express';
import getAlbumTracks from '../services/prisma/tracks/get-album-tracks';
const getAlbumsTracks = async (req: Request, resp: Response) => {
  try {
    const { id } = req.params;

    const tracks = await getAlbumTracks(parseInt(id, 10));

    resp.status(200).send({ tracks: tracks });
  } catch (error) {
    console.error(error);
  }
};

export default getAlbumsTracks;
