import { Request, Response } from 'express';
import findArtists from '../services/prisma/artist/find-artists';
import findArtistError from '../errors/find-artist-error';

const getArtisis = async (_req: Request, resp: Response): Promise<void> => {
  const allArtists = await findArtists();

  allArtists ? resp.status(200).json(allArtists) : resp.status(404).json(findArtistError());
};

export default getArtisis;
