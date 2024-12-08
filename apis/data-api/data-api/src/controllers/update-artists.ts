import { Request, Response } from 'express';
import updateArtistError from '../errors/update-artist-error';
import updateArtist from '../services/prisma/artist/update-artists';

/**
 * Handles PATCH requests to update an artist in the database.
 *
 * @param req - The Express request object containing the artist ID and new name in the request body.
 * @param resp - The Express response object used to send the response back to the client.
 * @returns No explicit return value. It sends a JSON response indicating success or failure, along with the updated artist data or an error message.
 */

const updateArtists = async (req: Request, resp: Response): Promise<void> => {
  try {
    const { artistID, name } = req.body;

    const updatedArtist = await updateArtist(artistID, name);

    const output = {
      updatedArtist: updatedArtist,
    };

    if (updatedArtist) resp.status(202).json(output);
    else resp.status(400).json(updateArtistError());
  } catch (err) {
    console.error(err);
  }
};

export default updateArtists;
