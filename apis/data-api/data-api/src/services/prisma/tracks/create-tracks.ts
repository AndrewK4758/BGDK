import { prisma } from '@bgdk/prisma';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

/**
 * Creates a new track in the database.
 *
 * @param query - The Prisma query object for creating the track.
 * @returns A Promise that resolves to the newly created track, or null if an error occurs.
 */

const createTracks = async (query: Prisma.trackCreateArgs<DefaultArgs>) => {
  try {
    return await prisma.track.create(query);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default createTracks;
