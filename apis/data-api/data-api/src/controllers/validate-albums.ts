import { Request, Response } from 'express';
import validateAlbum from '../services/prisma/album/validate-album';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

const validateAlbums = async (req: Request, resp: Response) => {
  try {
    const { artistID, title } = req.query;

    const query = {
      where: {
        artist_id: { equals: parseInt(artistID as string, 10) },
        AND: {
          title: { equals: title as string, mode: 'insensitive' },
        },
      },
    } as Prisma.albumFindFirstArgs<DefaultArgs>;

    const artist = await validateAlbum(query);

    artist
      ? resp.status(200).json({ message: 'Album Already Exists' })
      : resp.status(200).json({ message: 'Album Not in List. Please Submit to Continue' });
  } catch (error) {
    console.error(error);
  }
};

export default validateAlbums;
