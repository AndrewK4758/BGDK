import { Request, Response } from 'express';
import findAllAlbums from '../services/prisma/album/find-albums.ts';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

const getAlbums = async (req: Request, resp: Response) => {
  if (req.query.take) {
    try {
      const { take, skip, cursor } = req.query;

      const query = {
        take: parseInt(take as string, 10),
        skip: parseInt(skip as string, 10),
        cursor: { album_id: parseInt(cursor as string, 10) },
      } as Prisma.albumFindManyArgs<DefaultArgs>;
      const albums = await findAllAlbums(query);

      resp.status(200).json({ albums: albums });
    } catch (error) {
      console.error(error);
    }
  }
};

export default getAlbums;
