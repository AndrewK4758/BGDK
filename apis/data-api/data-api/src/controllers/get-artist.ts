import { Request, Response } from 'express';
import findArtistError from '../errors/find-artist-error';
import findArtist from '../services/prisma/artist/find-artist';

/**
 * Handles GET requests to retrieve an artist from the database by ID.
 *
 * @param req - The Express request object containing the artist ID in the URL parameters.
 * @param resp - The Express response object used to send the response back to the client.
 * @returns No explicit return value. It sends a JSON response with the artist data if found, or an error message if not found or an error occurs.
 */

const getArtist = async (req: Request, resp: Response) => {
  try {
    const artistID = req.params.id;

    const artist = await findArtist(parseInt(artistID, 10));

    if (artist) resp.status(200).json(artist);
    else resp.status(404).json(findArtistError());
  } catch (error) {
    console.error(error);
  }
};

export default getArtist;
