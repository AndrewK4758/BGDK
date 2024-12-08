import { prisma } from '@bgdk/prisma';
import type { Prisma } from '@prisma/client';

/**
 * This function checks if an artist exists in the database based on the provided query.
 *
 * @param query - An object containing the query parameters for filtering artists.
 * @returns A Promise that resolves to true if an artist matching the query exists, false otherwise, or null if an error occurs.
 */

const validateArtist = async (query: Prisma.artistWhereInput) => {
  try {
    return await prisma.artist.exists(query);
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default validateArtist;
