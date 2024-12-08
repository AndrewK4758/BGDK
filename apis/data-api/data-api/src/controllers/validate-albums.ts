import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import validateAlbum from '../services/prisma/album/validate-album';

/**
 * Middleware function that validates if an album exists in the database.
 *
 * This function checks if the `title` query parameter is present in the request. If it is, it extracts the `artistID` and `title` from the query parameters and constructs a Prisma query to check if an album with the given title and artist ID exists. It then sends a JSON response indicating whether the album exists or not. If the `title` parameter is not present, it calls the `next()` middleware function to continue processing the request.
 *
 * @param req - The Express request object.
 * @param resp - The Express response object.
 * @param next - The next middleware function in the chain.
 * @returns No explicit return value. It either sends a JSON response indicating album existence or calls the `next()` middleware function.
 */

const validateAlbums = async (req: Request, resp: Response, next: NextFunction) => {
  if (req.query.title) {
    try {
      const { artistID, title } = req.query;

      const query = {
        where: {
          title: { equals: title as string, mode: 'insensitive' },
          artist_id: { equals: parseInt(artistID as string, 10) },
        },
      } as Prisma.albumWhereInput;

      const album = await validateAlbum(query);

      if (album) resp.status(200).json({ message: 'Album Already Exists' });
      else resp.status(200).json({ message: 'Album Not in List. Please Submit to Continue' });
    } catch (error) {
      console.error(error);
    }
  } else {
    next();
  }
};

export default validateAlbums;
