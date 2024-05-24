import {
  registerAction,
  createPlayerID,
  registerOnGameInstance,
  filterAvatar,
  updateLastActive,
  playerCreated,
} from '../index';
import { InstanceOfGame, GameContextKeys, getCurrentMinute } from '@aklapper/model';
import { Context, ContextBuilder } from '@aklapper/chain';
import { ChutesAndLadders, Game } from '@aklapper/chutes-and-ladders';
import { mockReqObj, mockRespObj } from './__mocks__/__mock_';

let ctx: Context, game: InstanceOfGame, output: object;

describe('register chain test', () => {
  beforeAll(() => {
    game = new InstanceOfGame(getCurrentMinute(), 'gameID', new Game(new ChutesAndLadders(5, 5)));
    ctx = ContextBuilder.build();
    ctx.put(GameContextKeys.GAME, game);
    ctx.put(GameContextKeys.REQUEST, mockReqObj);
    ctx.put(GameContextKeys.RESPONSE, mockRespObj);
    ctx.put(GameContextKeys.ACTION, 'register');
    ctx.put(GameContextKeys.NEXT, '');
    output = { message: 'Player Created' };
  });

  it('should return true for register action', () => {
    expect(registerAction.execute(ctx)).toBeTruthy();
    expect(ctx.get(GameContextKeys.NEXT)).toEqual('create-playerID');
  });

  it('should create a unique player ID', () => {
    const commandResult = createPlayerID.execute(ctx);
    const playerID = ctx.get('playerID') as string;

    expect(commandResult).toBeTruthy();
    expect(playerID.length).toEqual(6);
    expect(ctx.get(GameContextKeys.NEXT)).toEqual('register-on-game');
  });

  it('should register player in game instance', () => {
    const commandResult = registerOnGameInstance.execute(ctx);

    expect(commandResult).toBeTruthy();
    expect(game.instance.playersArray.length).toEqual(1);
    expect(ctx.get(GameContextKeys.NEXT)).toEqual('filter-avatar');
  });

  it('should filter avatar selected from player selection', () => {
    registerOnGameInstance.execute(ctx);

    const commandResult = filterAvatar.execute(ctx);
    expect(commandResult).toBeTruthy();
    expect(game.instance.instance.avatarList.find((a) => a.name === game.instance.playersArray[0].name)).toBeFalsy();
    expect(ctx.get(GameContextKeys.NEXT)).toEqual('update-last-active');
  });

  it('should update the last active property in InstanceOfGame', () => {
    const commandResult = updateLastActive.execute(ctx);

    expect(commandResult).toBeTruthy();
    expect(game.lastActive).toEqual(getCurrentMinute());
    expect(ctx.get(GameContextKeys.NEXT)).toEqual('player-created');
  });

  it('should add add playerID to response header and add a message object to the out property of context object', () => {
    const commandResult = playerCreated.execute(ctx);

    expect(commandResult).toBeTruthy();
    expect(ctx.get(GameContextKeys.OUTPUT)).toEqual(output);
  });
});