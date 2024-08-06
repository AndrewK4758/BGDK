import { artist } from '@prisma/client';
import prisma from '../client/client-instance/prisma-client';

const deleteArtists = async (id: number): Promise<artist> => {
  try {
    return prisma.artist.delete({ where: { artist_id: id } });
  } catch (err) {
    console.log(err);
  }
};

export default deleteArtists;
