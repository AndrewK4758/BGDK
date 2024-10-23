import { Request, Response } from 'express';
import deleteArtistAlbums from '../services/prisma/album/delete-albums.ts';

const deleteArtistsAlbums = async (req: Request, resp: Response) => {
  try {
    const { id } = req.params;

    const deletedAlbum = await deleteArtistAlbums(parseInt(id, 10));

    resp.status(200).json({ deletedAlbum: deletedAlbum });
  } catch (error) {
    console.error(error);
  }
};

export default deleteArtistsAlbums;
