import { Prisma } from '@prisma/client';
import deleteTrack from '../services/prisma/tracks/delete-track';
import { Request, Response } from 'express';
import { DefaultArgs } from '@prisma/client/runtime/library';

const deleteTracks = async (req: Request, resp: Response) => {
  try {
    const { id } = req.params;

    const query: Prisma.trackDeleteArgs<DefaultArgs> = {
      where: { track_id: parseInt(id, 10) },
    };
    const deletedTrack = await deleteTrack(query);

    resp.status(200).json({ deletedTrack: deletedTrack });
  } catch (error) {
    console.error(error);
  }
};

export default deleteTracks;
