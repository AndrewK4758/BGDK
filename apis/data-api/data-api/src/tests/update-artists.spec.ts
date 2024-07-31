import { mockReqObj, mockRespObj } from '__mocks__/mocks';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import updateArtist from '../controllers/update-artists';

let req: Partial<Request>, resp: Partial<Response>, prisma: PrismaClient, id: number;
describe('Test getArtists controller', () => {
  beforeAll(async () => {
    prisma = new PrismaClient();
    req = mockReqObj();
    resp = mockRespObj();
    id = -3;

    req.body = { name: 'UPDATED IN JEST UPDATE TEST', artist_id: id };
  });

  afterAll(async () => {
    await prisma.artist.delete({
      where: {
        artist_id: id,
      },
    });
    await prisma.$disconnect();
  });

  it('Should return a status of 202 and a json object with the artists name changed in Chinook database', async () => {
    await prisma.artist.create({
      data: {
        artist_id: id,
        name: 'CREATED IN JEST UPDATE TEST',
      },
    });

    await updateArtist(req as Request, resp as Response);

    expect(resp.status).toEqual(202);
    expect(resp.json['updatedArtist'].name).toEqual(req.body.name);
  });
});
