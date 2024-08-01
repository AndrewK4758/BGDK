import postArtists from '../controllers/post-artists';
import { mockReqObj, mockRespObj } from '__mocks__/mocks';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

let req: Partial<Request>, resp: Partial<Response>, prisma: PrismaClient, id: number;
describe('Test postArtists controller', () => {
  beforeAll(async () => {
    prisma = new PrismaClient();
    req = mockReqObj();
    resp = mockRespObj();
    req.body = { name: 'ADDED IN JEST TEST' };
  });

  afterAll(async () => {
    await prisma.artist.delete({
      where: {
        artist_id: id,
      },
    });

    await prisma.$disconnect();
  });

  it('Should return a status of 202 and a json object with the artist added in Artist table in Chinook database', async () => {
    await postArtists(req as Request, resp as Response);
    id = resp.json['newArtist'].artist_id;
    expect(resp.status).toEqual(201);
  });
});
