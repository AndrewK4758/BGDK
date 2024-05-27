import { Context, ContextBuilder } from '@aklapper/chain';
import { GameContextKeys } from '@aklapper/model';
import { mockRespObj } from '__mocks__/mocks';
import { outputContextResponse } from '../index';

interface ICtxOutput {
  message: string;
}

let ctx: Context, output: ICtxOutput;
beforeEach(() => {
  ctx = ContextBuilder.build();
  output = { message: 'output to client as json' } as ICtxOutput;
  ctx.put(GameContextKeys.RESPONSE, mockRespObj);
});
describe('adds out prop of context obj to response obj', () => {
  it('should put the value of the out property on the context object onto the response object to send to client', () => {
    ctx.put(GameContextKeys.OUTPUT, output);
    const commandResult = outputContextResponse.execute(ctx);

    expect(commandResult).toBeTruthy();
    expect(mockRespObj.status).toEqual(201);
    expect(mockRespObj.json).toEqual(output);
    expect(ctx.get(GameContextKeys.OUTPUT)).toEqual(output);
  });

  it('should send status of 200 without data being sent from context object', () => {
    const commandResult = outputContextResponse.execute(ctx);

    expect(commandResult).toBeTruthy();
    expect(mockRespObj.status).toEqual(200);
    expect(ctx.get(GameContextKeys.OUTPUT)).toBeFalsy();
  });
});
