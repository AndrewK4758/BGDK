import { Prisma, type album, type artist } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';
import searchAlbum from '../services/prisma/search-album';
import searchArtist from '../services/prisma/search-artist';

/**
 * Handles GET requests to search for artists or albums in the database.
 *
 * This function extracts the `search` and `type` query parameters from the request. The `search` parameter specifies the search term, and the `type` parameter indicates whether to search for artists or albums. It constructs Prisma queries based on the `type` and uses the `searchArtist` or `searchAlbum` service functions to retrieve the matching results. The results are then sent as a JSON response.
 *
 * @param req - The Express request object containing the search term and type in the query parameters.
 * @param resp - The Express response object used to send the response back to the client.
 * @returns No explicit return value. It sends a JSON response with the search results or an error message if an error occurs.
 */

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
