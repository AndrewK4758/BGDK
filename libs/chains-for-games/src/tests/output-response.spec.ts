import { Context, ContextBuilder } from '@bgdk/chain';
import { GameContextKeys, ITestCtxOutput } from '@bgdk/types-game';
import { mockRespObj } from '__mocks__/mocks';
import { outputContextResponse } from '../index';

let ctx: Context, output: ITestCtxOutput;

describe('test output response chain', () => {
  beforeAll(() => {
    ctx = ContextBuilder.build();
    output = { message: 'output to client as json' } as ITestCtxOutput;
    ctx.put(GameContextKeys.RESPONSE, mockRespObj);
  });
  afterAll(() => {
    ctx.state.clear();
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
      ctx.state.clear();
      ctx.put(GameContextKeys.RESPONSE, mockRespObj);
      const commandResult = outputContextResponse.execute(ctx);

      expect(commandResult).toBeTruthy();
      expect(mockRespObj.status).toEqual(200);
      expect(ctx.get(GameContextKeys.OUTPUT)).toBeFalsy();
    });
  });
});
