import { prisma } from '@bgdk/prisma';
import { artist } from '@prisma/client';

const createArtists = async (name: string): Promise<artist | null> => {
  try {
    return prisma.artist.create({ data: { name: name } });
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default createArtists;
