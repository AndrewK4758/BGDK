import { Context, ContextBuilder } from '@bgdk/chain';
import { InstanceOfGame } from '@bgdk/instance-of-game';
import { GameContextKeys } from '@bgdk/types-game';
import { Server } from 'socket.io';
import { deRefContextObject } from '../lib/de-ref-context-object.ts';
import { Game } from '@bgdk/game';
import { ChutesAndLadders } from '@bgdk/chutes-and-ladders';
import { mockReqObj, mockRespObj } from '__mocks__/mocks.mjs';
import { Request, Response } from 'express';

let context: Context, req: Partial<Request>, resp: Partial<Response>;
describe('Test de referencing context object', () => {
  beforeAll(() => {
    req = mockReqObj();
    resp = mockRespObj();

    context = ContextBuilder.build();
    context.put(GameContextKeys.ACTION, 'action');
    context.put(GameContextKeys.GAME, new InstanceOfGame(1, 'gameid', new Game(new ChutesAndLadders(5, 5))));
    context.put(GameContextKeys.REQUEST, req);
    context.put(GameContextKeys.RESPONSE, resp);
    context.put(GameContextKeys.NEXT, 'next-handler');
    context.put(GameContextKeys.OUTPUT, { message: 'output' });
    context.put(GameContextKeys.IO, new Server());
  });

  it('Should pass and de-reference all properties of context object', () => {
    const { action, game, req, resp, next, output, io } = deRefContextObject(context);

    expect(action).toEqual('action');
    expect(game).toBeInstanceOf(InstanceOfGame);
    expect(req).toEqual(req);
    expect(resp).toEqual(resp);
    expect(next).toEqual('next-handler');
    expect(output).toEqual({ message: 'output' });
    expect(io).toBeInstanceOf(Server);
  });
});
