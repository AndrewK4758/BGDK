import { prisma } from '@bgdk/prisma';
import type { Prisma } from '@prisma/client';

const validateAlbum = async (query: Prisma.albumWhereInput) => {
  try {
    return await prisma.album.exists(query);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default validateAlbum;
