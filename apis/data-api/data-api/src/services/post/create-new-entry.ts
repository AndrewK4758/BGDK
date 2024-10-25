import { prisma } from '@bgdk/prisma';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

const createNewEntry = async (query: Prisma.artistCreateArgs<DefaultArgs>) => {
  try {
    return prisma.artist.create(query);
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default createNewEntry;
