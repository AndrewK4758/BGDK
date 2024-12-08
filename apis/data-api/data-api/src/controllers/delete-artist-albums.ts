import { Request, Response } from 'express';
import deleteArtistAlbums from '../services/prisma/album/delete-albums';

/**
 * This function handles DELETE requests to delete an album associated with a specific artist.
 *
 * @param req - The Express request object, which should contain the artist ID and album ID in the URL parameters.
 * @param res - The Express response object, used to send the response back to the client.
 * @returns No explicit return value. It sends a JSON response indicating success or failure, along with the deleted album data or an error message.
 */

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
