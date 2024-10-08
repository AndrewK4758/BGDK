import { NextFunction, Request, Response } from 'express';
import validateAlbum from '../services/prisma/album/validate-album';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

const validateAlbums = async (req: Request, resp: Response, next: NextFunction) => {
  if (req.query.title) {
    try {
      const { artistID, title } = req.query;

      const query = {
        where: {
          title: { equals: title as string, mode: 'insensitive' },
          artist_id: { equals: parseInt(artistID as string, 10) },
        },
      } as Prisma.albumFindFirstArgs<DefaultArgs>;

      const album = await validateAlbum(query);

      if (album) resp.status(200).json({ message: 'Album Already Exists' });
      else resp.status(200).json({ message: 'Album Not in List. Please Submit to Continue' });

    } catch (error) {
      console.error(error);
    }
  } else {
    next();
  }
};

export default validateAlbums;
