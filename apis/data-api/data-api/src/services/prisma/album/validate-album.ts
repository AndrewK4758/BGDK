import { prisma } from '@bgdk/prisma';
import type { Prisma } from '@prisma/client';

/**
 * Checks if an album exists in the database.
 *
 * @param query - The Prisma query object to filter albums.
 * @returns A Promise that resolves to true if the album exists, false otherwise, or null if an error occurs.
 */

const validateAlbum = async (query: Prisma.albumWhereInput) => {
  try {
    return await prisma.album.exists(query);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default validateAlbum;
