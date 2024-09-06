import { prisma } from '@bgdk/prisma';
import { album } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

const findAllAlbums = async (query: Prisma.albumFindManyArgs<DefaultArgs>): Promise<album[]> => {
  try {
    return await prisma.album.findMany(query);
  } catch (error) {
    console.error(error);
  }
};

export default findAllAlbums;
