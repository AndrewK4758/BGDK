import { artist } from '@prisma/client';
import { prisma } from '@bgdk/prisma';

const updateArtist = async (artist_id: number, name: string): Promise<artist | null> => {
  try {
    return await prisma.artist.update({ where: { artist_id: artist_id }, data: { name: name } });
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default updateArtist;
