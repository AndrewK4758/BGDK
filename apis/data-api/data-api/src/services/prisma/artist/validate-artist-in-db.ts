import { prisma } from '@bgdk/prisma';

const validateArtist = async (query: unknown) => {
  try {
    return await prisma.artist.exists(query);
  } catch (err) {
    console.error(err);
  }
};

export default validateArtist;
