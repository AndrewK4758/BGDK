import { mockReqObj, mockRespObj } from '__mocks__/mocks';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import deleteArtist from '../controllers/delete-artists';

let req: Partial<Request>, resp: Partial<Response>, prisma: PrismaClient;
describe('Test deleteArtists controller', () => {
  beforeAll(() => {
    prisma = new PrismaClient();
    req = mockReqObj();
    resp = mockRespObj();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('Should return a status of 202 and a json object with the deleted artist from Chinook database', async () => {
    await prisma.artist.create({
      data: { artist_id: -1, name: 'ADDED TO DELETE' },
    });

    req.params = { id: '-1' };

    const artist = await prisma.artist.findUnique({
      where: { artist_id: Number(req.params.id) },
    });
    await deleteArtist(req as Request, resp as Response);

    expect(resp.status).toEqual(202);
    expect(resp.json['deletedArtist'].name).toEqual(artist.name);
  });
});
