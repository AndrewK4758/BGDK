import { prisma } from '@bgdk/prisma';
import type { Prisma } from '@prisma/client';

const validateArtist = async (query: Prisma.artistWhereInput) => {
  try {
    return await prisma.artist.exists(query);
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default validateArtist;
