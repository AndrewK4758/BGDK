import { artist } from '@prisma/client';
import { prisma } from '@bgdk/prisma';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

/**
 * This function retrieves a list of artists from the database based on the provided query.
 *
 * @param query - An object containing the query parameters for filtering and sorting artists.
 * @returns A Promise that resolves to an array of artist objects, or null if an error occurs.
 */

const findArtists = async (query: Prisma.artistFindManyArgs<DefaultArgs>): Promise<artist[] | null> => {
  try {
    return await prisma.artist.findMany(query);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default findArtists;
