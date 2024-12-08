import { prisma } from '@bgdk/prisma';

/**
 * Updates an existing album in the database.
 *
 * @param albumID - The ID of the album to update.
 * @param title - The new title of the album.
 * @returns A Promise that resolves to the updated album object, or null if an error occurs.
 */

const updateAlbum = async (albumID: number, title: string) => {
  try {
    return await prisma.album.update({
      where: {
        album_id: albumID,
      },
      data: { title: title },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default updateAlbum;
