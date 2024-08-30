import { prisma } from '@bgdk/prisma';

const getArtistAlbums = (artistID: number) => {

  try {
    return prisma.album.findMany({
      where: { artist_id: artistID },
    });
  } catch (err) {
    console.error(err);
  }
};

export default getArtistAlbums;
