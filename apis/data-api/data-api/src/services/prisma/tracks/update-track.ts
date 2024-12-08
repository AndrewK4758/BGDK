import { prisma } from '@bgdk/prisma';
import { track, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

/**
 * Updates an existing track in the database.
 *
 * @param trackData - The data for updating the track.
 * @returns A Promise that resolves to the updated track object, or null if an error occurs.
 */

const updateTrack = async (trackData: track) => {
  try {
    const { track_id, album_id, name, unit_price, genre_id, media_type_id, composer, milliseconds, bytes } = trackData;

    const query = {
      where: { track_id: track_id },
      data: {
        album_id: album_id,
        name: name,
        unit_price: unit_price,
        genre_id: genre_id,
        media_type_id: media_type_id,
        composer: composer,
        milliseconds: milliseconds,
        bytes: bytes,
      },
    } as Prisma.trackUpdateArgs<DefaultArgs>;
    return await prisma.track.update(query);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default updateTrack;
