import { prisma } from '@bgdk/prisma';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

const searchArtist = async (query: Prisma.artistFindManyArgs<DefaultArgs>) => {
  try {
    return await prisma.artist.findMany(query);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default searchArtist;
