import { prisma } from '@bgdk/prisma';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

const getAlbumTracks = async (query: Prisma.trackFindManyArgs<DefaultArgs>) => {
  try {
    return await prisma.track.findMany(query);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getAlbumTracks;
