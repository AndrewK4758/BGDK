import { Context, ContextBuilder } from '@bgdk/chain';
import { ChutesAndLadders } from '@bgdk/chutes-and-ladders';
import { Game } from '@bgdk/game';
import { getCurrentMinute, InstanceOfGame } from '@bgdk/instance-of-game';
import { Color, GameContextKeys } from '@bgdk/types-game';
import { mockReqObj, mockRespObj } from '__mocks__/mocks';
import { Request, Response } from 'express';
import {
  createPlayerID,
  filterAvatar,
  playerCreated,
  registerAction,
  registerOnGameInstance,
  updateLastActive,
} from '../index';

let ctx: Context, game: InstanceOfGame, req: Partial<Request>, resp: Partial<Response>;

describe('test register chain', () => {
  beforeEach(() => {
    game = new InstanceOfGame(getCurrentMinute(), 'game-ID', new Game(new ChutesAndLadders(5, 5)));

    ctx = ContextBuilder.build();

    req = mockReqObj();
    resp = mockRespObj();

    ctx.put(GameContextKeys.REQUEST, req);
    ctx.put(GameContextKeys.RESPONSE, resp);
    ctx.put(GameContextKeys.ACTION, 'register');
    ctx.put(GameContextKeys.NEXT, '');
    ctx.put(GameContextKeys.GAME, game);
  });

  it('should return true for register action', () => {
    expect(registerAction.execute(ctx)).toBeTruthy();
    expect(ctx.get(GameContextKeys.NEXT)).toEqual('create-playerID');
  });

  it('should create a unique player ID', () => {
    ctx.put(GameContextKeys.NEXT, 'create-playerID');
    const commandResult = createPlayerID.execute(ctx);
    const playerID = ctx.get('playerID') as string;

    expect(commandResult).toBeTruthy();
    expect(playerID.length).toEqual(6);
    expect(ctx.get(GameContextKeys.NEXT)).toEqual('register-on-game');
  });

  it('should register player in game instance', () => {
    ctx.put(GameContextKeys.NEXT, 'register-on-game');
    const commandResult = registerOnGameInstance.execute(ctx);

    expect(commandResult).toBeTruthy();
    expect(game.instance.playersArray.length).toEqual(1);
    expect(ctx.get(GameContextKeys.NEXT)).toEqual('filter-avatar');
  });

  it('should filter avatar selected from player selection', () => {
    game.instance.register('player1', 'p-1-id', 'XENOMORPH', Color.RED);
    ctx.put(GameContextKeys.NEXT, 'filter-avatar');

    const commandResult = filterAvatar.execute(ctx);
    expect(commandResult).toBeTruthy();
    expect(game.instance.instance.avatarList.find(a => a.name === game.instance.playersArray[0].name)).toBeFalsy();
    expect(ctx.get(GameContextKeys.NEXT)).toEqual('update-last-active');
  });

  it('should update the last active property in InstanceOfGame', () => {
    ctx.put(GameContextKeys.NEXT, 'update-last-active');
    const commandResult = updateLastActive.execute(ctx);

    expect(commandResult).toBeTruthy();
    expect(game.lastActive).toEqual(getCurrentMinute());
    expect(ctx.get(GameContextKeys.NEXT)).toEqual('player-created');
  });

  it('should add add playerID to response header and add a message object to the out property of context object', () => {
    ctx.put(GameContextKeys.NEXT, 'player-created');
    const commandResult = playerCreated.execute(ctx);

    expect(commandResult).toBeTruthy();
  });
});
