import { prisma } from '@bgdk/prisma';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

const getArtistAlbums = (query: Prisma.albumFindManyArgs<DefaultArgs>) => {
  try {
    return prisma.album.findMany(query);
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default getArtistAlbums;
