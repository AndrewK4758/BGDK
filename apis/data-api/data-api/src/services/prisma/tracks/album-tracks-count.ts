import { prisma } from '@bgdk/prisma';

/**
 * Counts the number of tracks in a given album.
 *
 * @param albumID - The ID of the album.
 * @returns A Promise that resolves to the number of tracks, or null if an error occurs.
 */

const albumTracksCount = async (albumID: number): Promise<number | null> => {
  try {
    return await prisma.track.count({ where: { album_id: { equals: albumID } } });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default albumTracksCount;
