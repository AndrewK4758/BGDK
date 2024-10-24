import { Request, Response } from 'express';
import updateTrack from '../services/prisma/tracks/update-track';

const updateTracks = async (req: Request, resp: Response) => {
  try {
    const { trackData } = req.body;

    const updatedTrack = await updateTrack(trackData);

    resp.status(200).json({ updatedTrack: updatedTrack });
  } catch (error) {
    console.error(error);
  }
};
export default updateTracks;
