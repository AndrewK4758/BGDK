import { prisma } from '@bgdk/prisma';
import { track } from '@prisma/client';

const getAlbumTracks = async (album_id: number): Promise<track[]> => {
  try {
    return await prisma.track.findMany({ where: { album_id: { equals: album_id } } });
  } catch (error) {
    console.error(error);
  }
};

export default getAlbumTracks;
