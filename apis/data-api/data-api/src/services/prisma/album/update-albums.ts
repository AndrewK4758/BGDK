import { prisma } from '@bgdk/prisma';

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
