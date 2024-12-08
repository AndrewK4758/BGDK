import { Request, Response } from 'express';
import deleteArtists from '../services/prisma/artist/delete-artist';
import deleteArtistError from '../errors/delete-artist-error';

/**
 * Handles DELETE requests to delete an artist from the database.
 *
 * @param req - The Express request object containing the artist ID in the URL parameters.
 * @param resp - The Express response object used to send the response back to the client.
 * @returns No explicit return value. It sends a JSON response indicating success or failure, along with the deleted artist data or an error message.
 */

const deleteArtist = async (req: Request, resp: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedArtist = await deleteArtists(parseInt(id, 10));

    const output = {
      deletedArtist: deletedArtist,
    };

    resp.status(202).json(output);
  } catch (error) {
    console.error(error);
    resp.status(400).json(deleteArtistError());
  }
};

export default deleteArtist;
