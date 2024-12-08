import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';
import findAllAlbums from '../services/prisma/album/find-albums';

/**
 * Retrieves a paginated list of albums from the database.
 *
 * This function checks if the `take` query parameter is present in the request. If it is, it extracts the `take`, `skip`, and `cursor` values from the query parameters and constructs a Prisma query to retrieve a paginated list of albums. The retrieved albums are then sent as a JSON response.
 *
 * @param req - The Express request object, which may contain query parameters for pagination.
 * @param resp - The Express response object, used to send the response back to the client.
 * @returns No explicit return value. It sends a JSON response with the paginated list of albums if the `take` parameter is present, otherwise it does nothing.
 */

const getAlbums = async (req: Request, resp: Response) => {
  if (req.query.take) {
    try {
      const { take, skip, cursor } = req.query;

      const query = {
        take: parseInt(take as string, 10),
        skip: parseInt(skip as string, 10),
        cursor: { album_id: parseInt(cursor as string, 10) },
      } as Prisma.albumFindManyArgs<DefaultArgs>;
      const albums = await findAllAlbums(query);

      resp.status(200).json({ albums: albums });
    } catch (error) {
      console.error(error);
    }
  }
};

export default getAlbums;
