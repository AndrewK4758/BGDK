import { mockReqObj, mockRespObj } from '@bgdk/mocks';
import { Request, Response } from 'express';
import sendGameList from '../../src/controllers/send_game_list';

let req: Partial<Request>, resp: Partial<Response>;
describe('Test send game list controller', () => {
  beforeAll(() => {
    req = mockReqObj();
    resp = mockRespObj();
  });

  it('Should pass and return status of 200 and IBuiltGame[]', async () => {
    await sendGameList(req as Request, resp as Response);

    expect(resp.status).toEqual(200);
    expect((resp as Response).json.length).toEqual(2);
  });
});