import { prisma } from '@bgdk/prisma';

const artistAlbumsCount = async (artistID: number): Promise<number | null> => {
  try {
    return await prisma.album.count({ where: { artist_id: { equals: artistID } } });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default artistAlbumsCount;
