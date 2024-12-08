import { prisma } from '@bgdk/prisma';
import { album } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

/**
 * This function retrieves all albums from the database based on the provided query.
 *
 * @param query - An object containing the query parameters for filtering and sorting albums.
 * @returns A Promise that resolves to an array of album objects, or null if an error occurs.
 */

const findAllAlbums = async (query: Prisma.albumFindManyArgs<DefaultArgs>): Promise<album[] | null> => {
  try {
    return await prisma.album.findMany(query);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default findAllAlbums;
