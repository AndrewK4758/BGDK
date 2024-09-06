import { Request, Response } from 'express';
import validateTrack from '../services/prisma/tracks/validate-track';

const validateTracks = async (req: Request, resp: Response) => {
  try {
    const { albumID, name } = req.query;

    const query = {
      where: { album_id: { equals: parseInt(albumID as string, 10) }, name: { equals: `${name}` as string } },
    };

    const validatedTrack = await validateTrack(query);

    validatedTrack
      ? resp.status(200).json({ message: 'Track Already Exists' })
      : resp.status(200).json({ message: 'Track Not in Album. Please Submit to Continue' });
  } catch (error) {
    console.error(error);
  }
};

export default validateTracks;
