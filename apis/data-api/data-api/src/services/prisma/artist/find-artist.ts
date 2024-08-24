import { artist } from '@prisma/client';
import { prisma } from '@bgdk/prisma';

const findArtist = async (id: number): Promise<artist[]> => {
  try {
    return await prisma.artist.findMany({ where: { artist_id: { equals: id } } });
  } catch (err) {
    console.log(err);
  }
};

export default findArtist;
