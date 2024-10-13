import { album, artist, Prisma, track } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';
import createNewEntry from '../services/post/create-new-entry.ts';

interface NewEntryData {
  artist: artist;
  album: album;
  track: track;
}

const createNewEntrys = async (req: Request, resp: Response) => {
  try {
    const { artist, album, track } = req.body as NewEntryData;

    const query = {
      include: { album: { include: { track: true } } },
      data: {
        name: artist.name,
        album: {
          create: [
            {
              title: album.title,
              track: {
                create: {
                  name: track.name,
                  media_type_id: track.media_type_id,
                  genre_id: track.genre_id,
                  composer: track.composer,
                  milliseconds: track.milliseconds,
                  bytes: track.bytes,
                  unit_price: track.unit_price,
                },
              },
            },
          ],
        },
      },
    } as Prisma.artistCreateArgs<DefaultArgs>;

    const newEntry = await createNewEntry(query);

    resp.status(200).json({ newEntry: newEntry });
  } catch (err) {
    console.error(err);
    resp.status(500).json({ newEntry: `Error adding entry. Please submit again` });
  }
};
export default createNewEntrys;
