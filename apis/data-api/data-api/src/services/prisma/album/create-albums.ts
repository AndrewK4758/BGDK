import { prisma } from '@bgdk/prisma';

const createAlbum = async (artistID: number, title: string) => {
  try {
    return await prisma.album.create({ data: { artist_id: artistID, title: title } });
  } catch (error) {
    console.error(error);
  }
};

export default createAlbum;
