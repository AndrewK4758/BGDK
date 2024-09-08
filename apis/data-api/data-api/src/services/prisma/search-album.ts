import { prisma } from '@bgdk/prisma';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

const searchAlbum = async (query: Prisma.albumFindManyArgs<DefaultArgs>) => {
  try {
    return await prisma.album.findMany(query);
  } catch (error) {
    console.error(error);
  }
};

export default searchAlbum;
