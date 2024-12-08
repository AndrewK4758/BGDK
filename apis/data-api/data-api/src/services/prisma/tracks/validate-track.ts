import { prisma } from '@bgdk/prisma';
import type { Prisma } from '@prisma/client';

/**
 * Checks if a track exists in the database.
 *
 * @param query - The Prisma query object to filter tracks.
 * @returns A Promise that resolves to true if a track matching the query exists, false otherwise, or null if an error occurs.
 */

const validateTrack = async (query: Prisma.trackWhereInput): Promise<boolean | null> => {
  try {
    return await prisma.track.exists(query);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default validateTrack;
