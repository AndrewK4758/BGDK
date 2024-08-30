import { prisma } from '@bgdk/prisma';

const deleteArtistAlbums = async (albumID: number) => {
  try {
    return await prisma.album.delete({ where: { album_id: albumID } });
  } catch (error) {
    console.error(error);
  }
};

export default deleteArtistAlbums;
