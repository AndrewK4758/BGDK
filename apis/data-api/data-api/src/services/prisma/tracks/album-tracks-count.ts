import { prisma } from '@bgdk/prisma';

const albumTracksCount = async (albumID: number): Promise<number | null> => {
  try {
    return await prisma.track.count({ where: { album_id: { equals: albumID } } });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default albumTracksCount;
