import { artist } from '@prisma/client';
import prisma from '../prisma-client';

const findArtists = async (): Promise<artist[]> => {
  try {
    return await prisma.artist.findMany();
  } catch (err) {
    console.log(err);
  }
};

export default findArtists;
