import { artist } from '@prisma/client';
import { prisma } from '@bgdk/prisma';

const deleteArtists = async (id: number): Promise<artist | null> => {
  try {
    return prisma.artist.delete({ where: { artist_id: id } });
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default deleteArtists;
