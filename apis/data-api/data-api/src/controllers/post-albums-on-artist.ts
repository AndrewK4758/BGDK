import { Request, Response } from 'express';
import createAlbum from '../services/prisma/album/create-albums';

/**
 * This function handles POST requests to add a new album to an existing artist.
 *
 * @param req - The Express request object, which should contain the artist ID in the URL parameters and the album title in the request body.
 * @param res - The Express response object, used to send the response back to the client.
 * @returns No explicit return value. It sends a JSON response indicating success or failure, along with the new album data or an error message.
 */

const createAlbumsOnArtists = async (req: Request, resp: Response) => {
  try {
    const { artistID, title } = req.body;

    const newAlbum = await createAlbum(parseInt(artistID, 10), title);

    resp.status(200).json({ message: 'Album Created', newAlbum: newAlbum });
  } catch (error) {
    console.error(error);
  }
};

export default createAlbumsOnArtists;
