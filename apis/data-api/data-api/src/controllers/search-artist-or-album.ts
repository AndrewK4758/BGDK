import { Prisma, type album, type artist } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';
import searchAlbum from '../services/prisma/search-album';
import searchArtist from '../services/prisma/search-artist';

const searchArtistsAndAlbums = async (req: Request, resp: Response) => {
  try {
    const { search, type } = req.query;

    const queryArtist: Prisma.artistFindManyArgs<DefaultArgs> = {
      where: {
        name: { startsWith: search as string, mode: 'insensitive' },
      },
    };

    const queryAlbum: Prisma.albumFindManyArgs<DefaultArgs> = {
      where: {
        title: { startsWith: search as string, mode: 'insensitive' },
      },
    };

    type ResponseData = {
      artist: artist[];
      album: album[];
    };

    const responseData: ResponseData = {
      artist: [],
      album: [],
    };

    switch (type as string) {
      case 'artist':
        responseData.artist = (await searchArtist(queryArtist)) as artist[];
        break;
      case 'album':
        responseData.album = (await searchAlbum(queryAlbum)) as album[];
        break;
    }

    resp.status(200).json(responseData);
  } catch (error) {
    console.error(error);
  }
};

export default searchArtistsAndAlbums;
