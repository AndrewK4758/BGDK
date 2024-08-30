import { Request, Response } from 'express';
import createAlbum from '../services/prisma/album/create-albums';

const createAlbumsOnArtists = async (req: Request, resp: Response) => {
  try {
    const { artistID, title } = req.body;
    console.log(artistID);
    const newAlbum = await createAlbum(parseInt(artistID, 10), title);

    resp.status(200).json({ newAlbum: newAlbum });
  } catch (error) {
    console.error(error);
  }
};

export default createAlbumsOnArtists;
