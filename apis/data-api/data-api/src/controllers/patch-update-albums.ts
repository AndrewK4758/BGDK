import { Request, Response } from 'express';
import updateAlbum from '../services/prisma/album/update-albums.ts';

const updateAlbums = async (req: Request, resp: Response) => {
  try {
    const { albumID, title } = req.body;

    const updatedAlbum = await updateAlbum(parseInt(albumID, 10), title);

    resp.status(200).json({ updatedAlbum: updatedAlbum });
  } catch (error) {
    console.error(error);
  }
};

export default updateAlbums;
