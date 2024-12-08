import { prisma } from '@bgdk/prisma';
import { artist } from '@prisma/client';

/**
 * This function creates a new artist in the database.
 *
 * @param name - The name of the artist to be created.
 * @returns A Promise that resolves to the newly created artist object, or null if an error occurs.
 */

const createArtists = async (name: string): Promise<artist | null> => {
  try {
    return prisma.artist.create({ data: { name: name } });
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default createArtists;
