import { Context, ContextBuilder } from '@aklapper/chain';
import { GameContextKeys, getCurrentMinute, ILoadRegisterData, InstanceOfGame } from '@aklapper/model';
import { ChutesAndLadders, Color, Game } from '@aklapper/chutes-and-ladders';
import { loadRegister, sendLoadRegister } from '../index';
import { mockReqObj, mockRespObj } from './__mocks__/__mock_';

let ctx: Context, game: InstanceOfGame;

describe('test the load-register endpoint chain', () => {
  beforeAll(() => {
    ctx = ContextBuilder.build();
    game = new InstanceOfGame(getCurrentMinute(), 'gameID', new Game(new ChutesAndLadders(5, 5)));
    ctx.put(GameContextKeys.GAME, game);
    ctx.put(GameContextKeys.ACTION, 'load-register');
    ctx.put(GameContextKeys.REQUEST, mockReqObj);
    ctx.put(GameContextKeys.RESPONSE, mockRespObj);
    ctx.put(GameContextKeys.NEXT, '');
    ctx.put(GameContextKeys.OUTPUT, {});
  });

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
    const commandResult = sendLoadRegister.execute(ctx);

    expect(commandResult).toBeTruthy();
    // expect(ctx.get(GameContextKeys.OUTPUT)).toEqual(ctx.get('load-register-data'));
  });
});
