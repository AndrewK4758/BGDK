import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const deleteArtist = async (req: Request, resp: Response): Promise<void> => {
  const { id } = req.params;

  const deletedArtist = await prisma.artist.delete({
    where: { artist_id: Number(id) },
  });

  const output = {
    deletedArtist: deletedArtist,
  };

  deletedArtist !== undefined || null
    ? resp.status(202).json(output)
    : resp.status(400).json({ deletedArtist: 'ID NOT FOUND IN ARTIST TABLE' });
};

export default deleteArtist;
