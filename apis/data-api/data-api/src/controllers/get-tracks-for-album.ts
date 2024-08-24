import { Request, Response } from 'express';
import getAlbumTracks from '../services/prisma/tracks/get-album-tracks';

const getTracksForAlbums = async (req: Request, resp: Response) => {
  try {
    const query = req.query.album as string;
    console.log(req.query);
    const albumID = parseInt(query);
    console.log(albumID);

    const tracks = await getAlbumTracks(albumID);
    console.log(tracks);
    resp.status(200).json(tracks);
  } catch (error) {
    console.error(error);
  }
};

export default getTracksForAlbums;
