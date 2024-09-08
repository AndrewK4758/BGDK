import { Prisma } from '@prisma/client';
import searchArtist from '../services/prisma/search-artist';
import searchAlbum from '../services/prisma/search-album';
import { Request, Response } from 'express';
import { DefaultArgs } from '@prisma/client/runtime/library';

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

    const responseData = {
      artist: [],
      album: [],
    };

    switch (type) {
      case 'artist':
        responseData.artist = await searchArtist(queryArtist);
        break;
      case 'album':
        responseData.album = await searchAlbum(queryAlbum);
        break;
    }

    resp.status(200).json(responseData);
  } catch (error) {
    console.error(error);
  }
};

export default searchArtistsAndAlbums;
