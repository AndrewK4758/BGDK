import { prisma } from '@bgdk/prisma';

/**
 * Counts the number of albums associated with a specific artist.
 *
 * @param artistID - The ID of the artist.
 * @returns A Promise that resolves to the number of albums for the artist, or null if an error occurs.
 */

const artistAlbumsCount = async (artistID: number): Promise<number | null> => {
  try {
    return await prisma.album.count({ where: { artist_id: { equals: artistID } } });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default artistAlbumsCount;
