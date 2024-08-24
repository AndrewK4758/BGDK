import { artist } from '@prisma/client';
import { prisma } from '@bgdk/prisma';


const findArtists = async (query: unknown): Promise<artist[]> => {
  try {
    return await prisma.artist.findMany(query);
  } catch (err) {
    console.log(err);
  }
};

export default findArtists;
