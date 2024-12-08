import { artist } from '@prisma/client';
import { prisma } from '@bgdk/prisma';

/**
 * Finds an artist in the database by their ID.
 *
 * @param id - The ID of the artist to find.
 * @returns A Promise that resolves to the artist object if found, otherwise null.
 */

const findArtist = async (id: number): Promise<artist | null> => {
  try {
    return await prisma.artist.findUnique({ where: { artist_id: id }, include: { album: true } });
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default findArtist;
