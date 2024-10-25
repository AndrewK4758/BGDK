import { ContextBuilder } from '@bgdk/chain';
import { InstanceOfGame } from '@bgdk/instance-of-game';
import { Context, GameContextKeys } from '@bgdk/types-game';
import { mockReqObj, mockRespObj } from '@bgdk/mocks';
import { Game } from '@bgdk/game';
import { ChutesAndLadders } from '@bgdk/chutes-and-ladders';
import type { Request, Response } from 'express';
import { Server } from 'socket.io';
import { deRefContextObject } from '../src/lib/de-ref-context-object';

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
