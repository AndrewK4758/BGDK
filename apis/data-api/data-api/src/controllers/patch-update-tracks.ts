import { Request, Response } from 'express';
import updateTrack from '../services/prisma/tracks/update-track';

/**
 * Handles PATCH requests to update a track in the database.
 *
 * @param req - The Express request object containing the track data in the request body.
 * @param resp - The Express response object used to send the response back to the client.
 * @returns No explicit return value. It sends a JSON response indicating success or failure, along with the updated track data or an error message.
 */

const updateTracks = async (req: Request, resp: Response) => {
  try {
    const { trackData } = req.body;

    const updatedTrack = await updateTrack(trackData);

    resp.status(200).json({ updatedTrack: updatedTrack });
  } catch (error) {
    console.error(error);
  }
};
export default updateTracks;
