import { artist } from '@prisma/client';
import { prisma } from '@bgdk/prisma';

const findArtist = async (id: number): Promise<artist | null> => {
  try {
    return await prisma.artist.findUnique({ where: { artist_id: id }, include: { album: true } });
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default findArtist;
