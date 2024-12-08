import { prisma } from '@bgdk/prisma';

/**
 * Creates a new album in the database.
 *
 * @param artistID - The ID of the artist to associate the album with.
 * @param title - The title of the album.
 * @returns A Promise that resolves to the newly created album object, or null if an error occurs.
 */

const createAlbum = async (artistID: number, title: string) => {
  try {
    return await prisma.album.create({ data: { artist_id: artistID, title: title } });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default createAlbum;
