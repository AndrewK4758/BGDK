import { prisma } from '@bgdk/prisma';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

/**
 * Deletes a track from the database.
 *
 * @param query - The Prisma query for deleting the track.
 * @returns A Promise that resolves to the deleted track, or null if an error occurs.
 */

const deleteTrack = async (query: Prisma.trackDeleteArgs<DefaultArgs>) => {
  try {
    return await prisma.track.delete(query);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default deleteTrack;
