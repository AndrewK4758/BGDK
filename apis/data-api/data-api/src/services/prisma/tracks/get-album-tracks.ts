import { prisma } from '@bgdk/prisma';

const getAlbumTracks = async (albumID: number) => {
  try {
    return prisma.track.findMany({ where: { album_id: { equals: albumID } } });
  } catch (error) {
    console.error(error);
  }
};

export default getAlbumTracks;
