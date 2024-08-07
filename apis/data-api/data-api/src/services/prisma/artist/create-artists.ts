import { artist } from '@prisma/client';
import { prisma } from '@bgdk/prisma';

const createArtists = async (name: string): Promise<artist> => {
  try {
    return prisma.artist.create({ data: { name: name } });
  } catch (err) {
    console.log(err);
  }
};

export default createArtists;
