import { Request, Response } from 'express';
import createArtists from '../services/prisma/artist/create-artists';
import createArtistsError from '../errors/create-artist-error';

/**
 * Handles POST requests to create a new artist in the database.
 *
 * @param req - The Express request object containing the artist name in the request body.
 * @param resp - The Express response object used to send the response back to the client.
 * @returns No explicit return value. It sends a JSON response indicating success or failure, along with a success message or an error message.
 */

const postArtists = async (req: Request, resp: Response): Promise<void> => {
  const { name } = req.body;
  try {
    await createArtists(name);
    resp.status(201).json('Artist Sucessfully Added');
  } catch (error) {
    console.error(error);
    resp.status(400).json(createArtistsError());
  }
};

export default postArtists;
