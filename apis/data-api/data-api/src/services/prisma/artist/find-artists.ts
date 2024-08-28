import { artist, Prisma } from '@prisma/client';
import { prisma } from '@bgdk/prisma';
import { DefaultArgs } from '@prisma/client/runtime/library';

const findArtists = async (query: Prisma.artistFindManyArgs<DefaultArgs>): Promise<artist[]> => {
  try {
    return await prisma.artist.findMany(query);
  } catch (err) {
    console.log(err);
  }
};

export default findArtists;
