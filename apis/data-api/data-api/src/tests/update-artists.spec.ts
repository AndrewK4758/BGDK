import { mockReqObj, mockRespObj } from '__mocks__/mocks';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import updateArtist from '../controllers/update-artists';

let req: Partial<Request>, resp: Partial<Response>, prisma: PrismaClient;
describe('Test getArtists controller', () => {
  beforeAll(() => {
    prisma = new PrismaClient();
    req = mockReqObj();
    resp = mockRespObj();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('Should return a status of 202 and a json object with the artists name changed in Chinook database', async () => {
    req.body = { name: 'UPDATED IN JEST TEST', artist_id: 279 };

    await updateArtist(req as Request, resp as Response);

    expect(resp.status).toEqual(202);
    expect(resp.json['updatedArtist'].name).toEqual(req.body.name);
  });
});
