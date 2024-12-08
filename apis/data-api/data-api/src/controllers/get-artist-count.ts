import { NextFunction, Request, Response } from 'express';
import { prisma } from '@bgdk/prisma';

/**
 * Middleware function that retrieves the total count of artists in the database.
 *
 * This function checks if the `count` query parameter is NOT present in the request. If it is not present, it calls the `next()` middleware function to continue processing the request. If the `count` parameter is present, it retrieves the total number of artists from the database using Prisma and sends it as a JSON response.
 *
 * @param req - The Express request object.
 * @param resp - The Express response object.
 * @param next - The next middleware function in the chain.
 * @returns No explicit return value. It either sends a JSON response with the artist count or calls the `next()` middleware function.
 */

const getArtistCount = async (req: Request, resp: Response, next: NextFunction) => {
  if (!req.query.count) next();
  else {
    try {
      const count = await prisma.artist.count();

      resp.status(200).json({ count: count });
    } catch (err) {
      console.error(err);
    }
  }
};

export default getArtistCount;
