import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { NextFunction, Request, Response } from 'express';
import findArtistError from '../errors/find-artist-error';
import findArtists from '../services/prisma/artist/find-artists';

/**
 * Middleware function that retrieves a paginated list of artists from the database.
 *
 * This function checks if the `take` query parameter is present in the request. If it is, it extracts the `take`, `skip`, and `cursor` values from the query parameters and constructs a Prisma query to retrieve a paginated list of artists. The retrieved artists are then sent as a JSON response. If the `take` parameter is not present, it calls the `next()` middleware function to continue processing the request.
 *
 * @param req - The Express request object, which may contain query parameters for pagination.
 * @param resp - The Express response object, used to send the response back to the client.
 * @param next - The next middleware function in the chain.
 * @returns No explicit return value. It either sends a JSON response with the paginated list of artists or calls the `next()` middleware function.
 */

const getArtists = async (req: Request, resp: Response, next: NextFunction): Promise<void> => {
  if (!req.query.take) next();
  else {
    try {
      const { take, skip, cursor } = req.query;

      const query = {
        take: parseInt(take as string, 10),
        skip: parseInt(skip as string, 10),
        cursor: { artist_id: parseInt(cursor as string, 10) },
      } as Prisma.artistFindManyArgs<DefaultArgs>;

      const allArtists = await findArtists(query);

      resp.status(200).json({ allArtists: allArtists });
    } catch (err) {
      console.error(err);
      resp.status(404).json(findArtistError());
    }
  }
};
export default getArtists;
