import { prisma } from '@bgdk/prisma';

const getArtistAlbums = (artistID: number) => {

  try {
    return prisma.artist.findUnique({
      where: { artist_id: artistID },
      include: { album: { include: { track: true } } },
    });
  } catch (err) {
    console.error(err);
  }
};

export default getArtistAlbums;
