import { prisma } from '@bgdk/prisma';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

/**
 * This function retrieves a list of albums for a specific artist from the database.
 *
 * @param query - An object containing the query parameters for filtering albums (e.g., artist ID).
 * @returns A Promise that resolves to an array of album objects for the specified artist, or null if an error occurs.
 */

const getArtistAlbums = (query: Prisma.albumFindManyArgs<DefaultArgs>) => {
  try {
    return prisma.album.findMany(query);
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default getArtistAlbums;
