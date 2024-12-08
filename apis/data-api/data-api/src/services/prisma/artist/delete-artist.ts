import { artist } from '@prisma/client';
import { prisma } from '@bgdk/prisma';

/**
 * This function deletes an artist from the database by their ID.
 *
 * @param id - The ID of the artist to delete.
 * @returns A Promise that resolves to the deleted artist object, or null if an error occurs.
 */

const deleteArtists = async (id: number): Promise<artist | null> => {
  try {
    return prisma.artist.delete({ where: { artist_id: id } });
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default deleteArtists;
