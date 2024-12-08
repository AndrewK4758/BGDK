import { Request, Response } from 'express';
import updateAlbum from '../services/prisma/album/update-albums';

/**
 * This function handles PATCH requests to update the title of an existing album.
 *
 * @param req - The Express request object, which should contain the album ID in the URL parameters and the new album title in the request body.
 * @param res - The Express response object, used to send the response back to the client.
 * @returns No explicit return value. It sends a JSON response indicating success or failure, along with the updated album data or an error message.
 */

const updateAlbums = async (req: Request, resp: Response) => {
  try {
    const { albumID, title } = req.body;

    const updatedAlbum = await updateAlbum(parseInt(albumID, 10), title);

    resp.status(200).json({ message: 'Album Updated', updatedAlbum: updatedAlbum });
  } catch (error) {
    console.error(error);
  }
};

export default updateAlbums;
