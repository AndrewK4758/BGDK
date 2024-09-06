import { prisma } from '@bgdk/prisma';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

const createTracks = async (query: Prisma.trackCreateArgs<DefaultArgs>) => {
  try {
    return await prisma.track.create(query);
  } catch (error) {
    console.error(error);
  }
};

export default createTracks;
