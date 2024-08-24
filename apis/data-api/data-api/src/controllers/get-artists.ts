import { Request, Response } from 'express';
import findArtists from '../services/prisma/artist/find-artists';
import findArtistError from '../errors/find-artist-error';

const getArtists = async (req: Request, resp: Response): Promise<void> => {
  const { take, skip, cursor } = req.query;

  const query = {
    take: parseInt(take as string),
    skip: parseInt(skip as string),
    cursor: {
      artist_id: parseInt(cursor as string),
    },
  };

  const allArtists = await findArtists(query);

  allArtists ? resp.status(200).json(allArtists) : resp.status(404).json(findArtistError());
};

export default getArtists;
