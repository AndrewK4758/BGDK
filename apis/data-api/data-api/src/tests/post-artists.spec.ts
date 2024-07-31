import postArtists from '../controllers/post-artists';
import { mockReqObj, mockRespObj } from '__mocks__/mocks';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

let req: Partial<Request>, resp: Partial<Response>, prisma: PrismaClient;
describe('Test postArtists controller', () => {
  beforeAll(() => {
    prisma = new PrismaClient();
    req = mockReqObj();
    resp = mockRespObj();
    req.body = {};
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('Should return a status of 202 and a json object with the artist added in Artist table in Chinook database', async () => {
    req.body = { name: 'ADDED IN JEST TEST' };

    await postArtists(req as Request, resp as Response);

    expect(resp.status).toEqual(202);
    expect(resp.json['newArtist'].name).toEqual(req.body.name);
  });
});
