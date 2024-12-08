import { prisma } from '@bgdk/prisma';
import { Prisma, type track } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

/**
 *
 * @param {Prisma.trackFindManyArgs<DefaultArgs>} query - The Prisma query object to get all tracks on a specific album
 * @returns {Promsie<track[]>} - A Promise that resolves to an array of tracks or null if none exist
 */

const getAlbumTracks = async (query: Prisma.trackFindManyArgs<DefaultArgs>): Promise<track[] | null> => {
  try {
    return await prisma.track.findMany(query);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getAlbumTracks;
