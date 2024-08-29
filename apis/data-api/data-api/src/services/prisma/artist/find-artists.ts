import { artist } from '@prisma/client';
import { prisma } from '@bgdk/prisma';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

const findArtists = async (query: Prisma.artistFindManyArgs<DefaultArgs>): Promise<artist[]> => {
  try {
    return await prisma.artist.findMany(query);
  } catch (error) {
    console.error(error);
  }
};

export default findArtists;
