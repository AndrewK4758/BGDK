import { prisma } from '@bgdk/prisma';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

/**
 * Searches for artists in the database based on the provided query.
 *
 * @param query - An object containing the Prisma query parameters for filtering and sorting artists. This allows you to specify criteria such as name, artist ID, etc.
 *
 * @returns A Promise that resolves to an array of `artist` objects if the search is successful, `null` if an error occurs.
 */

const searchArtist = async (query: Prisma.artistFindManyArgs<DefaultArgs>) => {
  try {
    return await prisma.artist.findMany(query);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default searchArtist;
