import { prisma } from '@bgdk/prisma';

const albumTracksCount = async (albumID: number): Promise<number> => {
  try {
    return await prisma.track.count({ where: { album_id: { equals: albumID } } });
  } catch (error) {
    console.error(error);
  }
};

export default albumTracksCount;
