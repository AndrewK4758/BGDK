import getArtists from '../controllers/get-artists';
import { mockReqObj, mockRespObj } from '__mocks__/mocks';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

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

  it('Should return a status of 200 and a json object with all artists in Chinook database', async () => {
    await getArtists(req as Request, resp as Response);

    expect(resp.status).toEqual(200);
    expect(resp.json).toBeTruthy();
  });
});
