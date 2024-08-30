import { prisma } from '@bgdk/prisma';

const validateAlbum = async (query: unknown) => {
  try {
    return await prisma.album.exists(query);
  } catch (error) {
    console.error(error);
  }
};

export default validateAlbum;
