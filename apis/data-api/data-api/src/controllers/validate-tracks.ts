import type { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import validateTrack from '../services/prisma/tracks/validate-track';

/**
 * Handles GET requests to validate if a track exists within a specific album in the database.
 *
 * This function extracts the `albumID` and `name` query parameters from the request. It constructs a Prisma query to check if a track with the given name exists within the specified album. It then sends a JSON response indicating whether the track exists or not.
 *
 * @param req - The Express request object.
 * @param resp - The Express response object.
 * @returns No explicit return value. It sends a JSON response indicating track existence within the album.
 */

const validateTracks = async (req: Request, resp: Response) => {
  try {
    const { albumID, name } = req.query;

    const query = {
      where: { album_id: { equals: parseInt(albumID as string, 10) }, name: { equals: `${name}` as string } },
    } as Prisma.trackWhereInput;

    const validatedTrack = await validateTrack(query);

    if (validatedTrack) resp.status(200).json({ message: 'Track Already Exists' });
    else resp.status(200).json({ message: 'Track Not in Album. Please Submit to Continue' });
  } catch (error) {
    console.error(error);
  }
};

export default validateTracks;
