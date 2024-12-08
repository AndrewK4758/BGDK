import { prisma } from '@bgdk/prisma';

/**
 * Deletes an album from the database by its ID.
 *
 * @param albumID - The ID of the album to delete.
 * @returns A Promise that resolves to the deleted album object, or null if an error occurs.
 */

const deleteArtistAlbums = async (albumID: number) => {
  try {
    return await prisma.album.delete({ where: { album_id: albumID } });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default deleteArtistAlbums;
