import { prisma } from '@bgdk/prisma';

const artistAlbumsCount = async (artistID: number): Promise<number> => {
  try {
    return await prisma.album.count({ where: { artist_id: { equals: artistID } } });
  } catch (error) {
    console.error(error);
  }
};

export default artistAlbumsCount;
