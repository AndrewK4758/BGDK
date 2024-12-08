import { artist } from '@prisma/client';
import { prisma } from '@bgdk/prisma';

/**
 * Updates an existing artist in the database.
 *
 * @param artist_id - The ID of the artist to update.
 * @param name - The new name of the artist.
 * @returns A Promise that resolves to the updated artist object, or null if an error occurs.
 */

const updateArtist = async (artist_id: number, name: string): Promise<artist | null> => {
  try {
    return await prisma.artist.update({ where: { artist_id: artist_id }, data: { name: name } });
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default updateArtist;
