import { prisma } from '@bgdk/prisma';

const validateTrack = async (query: unknown): Promise<boolean> => {
  try {
    return await prisma.track.exists(query);
  } catch (error) {
    console.error(error);
  }
};

export default validateTrack;
