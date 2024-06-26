import { Context, ContextBuilder } from '@bgdk/chain';
import { IInstanceOfGame } from '@bgdk/instance-of-game';
import { GameContextKeys, ILoadRegisterData, Color } from '@bgdk/game-types';
import { loadRegister, sendLoadRegister } from '../index';
import {
  mockGameWithPlayersAdded,
  mockReqObj,
  mockRespObj,
} from '__mocks__/mocks';

let ctx: Context, game: IInstanceOfGame;
describe('test load register chain', () => {
  beforeAll(() => {
    game = mockGameWithPlayersAdded();
    ctx = ContextBuilder.build();

    ctx.put(GameContextKeys.ACTION, 'load-register');
    ctx.put(GameContextKeys.REQUEST, mockReqObj);
    ctx.put(GameContextKeys.RESPONSE, mockRespObj);
    ctx.put(GameContextKeys.NEXT, '');
    ctx.put(GameContextKeys.OUTPUT, {});
    ctx.put(GameContextKeys.GAME, game);
  });
  afterAll(() => {
    ctx.state.clear();
  });
  describe('test the load-register endpoint chain', () => {
    it('should add avatar list and color list to context object', () => {
      const commandResult = loadRegister.execute(ctx);

      const avatarListAndColors = ctx.get(
        GameContextKeys.OUTPUT
      ) as ILoadRegisterData;

      expect(commandResult).toBeTruthy();
      expect(ctx.get(GameContextKeys.NEXT)).toEqual('send-load-register-data');
      expect(avatarListAndColors.avatarList).toEqual(
        game.instance.instance.avatarList
      );
      expect(avatarListAndColors.avatarColorList).toEqual(Color);
      expect(ctx.get(GameContextKeys.OUTPUT)).toEqual(avatarListAndColors);
    });

    it('should add load register data to out property of context object', () => {
      ctx.put(GameContextKeys.NEXT, 'send-load-register-data');
      const commandResult = sendLoadRegister.execute(ctx);

      expect(commandResult).toBeTruthy();
    });
  });
});
