import { prisma } from '@bgdk/prisma';
import { artist } from '@prisma/client';

const createArtists = async (name: string): Promise<artist> => {
  try {
    return prisma.artist.create({ data: { name: name } });
  } catch (err) {
    console.log(err);
  }
};

export default createArtists;
