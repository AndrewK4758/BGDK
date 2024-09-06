import { prisma } from '@bgdk/prisma';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

const deleteTrack = async (query: Prisma.trackDeleteArgs<DefaultArgs>) => {
  try {
    return await prisma.track.delete(query);
  } catch (error) {
    console.error(error);
  }
};

export default deleteTrack;
