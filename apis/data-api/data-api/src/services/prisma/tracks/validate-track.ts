import { prisma } from '@bgdk/prisma';
import type { Prisma } from '@prisma/client';

const validateTrack = async (query: Prisma.trackWhereInput): Promise<boolean | null> => {
  try {
    return await prisma.track.exists(query);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default validateTrack;
