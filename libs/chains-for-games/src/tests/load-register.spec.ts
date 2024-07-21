import { Context, ContextBuilder } from '@bgdk/chain';
import { ChutesAndLadders } from '@bgdk/chutes-and-ladders';
import { Color, GameContextKeys, ILoadRegisterData } from '@bgdk/types-game';
import { InstanceOfGame, getCurrentMinute } from '@bgdk/instance-of-game';
import { Game } from '@bgdk/game';
import { mockReqObj, mockRespObj } from '__mocks__/mocks';
import { loadRegister, sendLoadRegister } from '../index';

let ctx: Context, game: InstanceOfGame, instance: ChutesAndLadders;
describe('test load register chain', () => {
  beforeEach(() => {
    instance = new ChutesAndLadders(5, 5);
    game = new InstanceOfGame(getCurrentMinute(), 'game-ID', new Game(instance));

    ctx = ContextBuilder.build();

    ctx.put(GameContextKeys.ACTION, 'load-register');
    ctx.put(GameContextKeys.REQUEST, mockReqObj);
    ctx.put(GameContextKeys.RESPONSE, mockRespObj);
    ctx.put(GameContextKeys.NEXT, '');
    ctx.put(GameContextKeys.OUTPUT, {});
    ctx.put(GameContextKeys.GAME, game);
  });

  afterEach(() => ctx.state.clear());

  afterAll(() => {
    jest.clearAllMocks();
  });
  describe('test the load-register endpoint chain', () => {
    it('should add avatar list and color list to context object', () => {
      const commandResult = loadRegister.execute(ctx);

      const avatarListAndColors = ctx.get(GameContextKeys.OUTPUT) as ILoadRegisterData;

      expect(commandResult).toBeTruthy();
      expect(ctx.get(GameContextKeys.NEXT)).toEqual('send-load-register-data');
      expect(avatarListAndColors.avatarList).toEqual(game.instance.instance.avatarList);
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
