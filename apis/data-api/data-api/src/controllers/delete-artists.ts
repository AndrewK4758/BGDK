import { Request, Response } from 'express';
import deleteArtists from '../services/prisma/artist/delete-artist';
import deleteArtistError from '../errors/delete-artist-error';

const deleteArtist = async (req: Request, resp: Response): Promise<void> => {
  const { id } = req.params;

  const deletedArtist = await deleteArtists(Number(id));

  const output = {
    deletedArtist: deletedArtist,
  };

  deletedArtist ? resp.status(202).json(output) : resp.status(400).json(deleteArtistError());
};

export default deleteArtist;
