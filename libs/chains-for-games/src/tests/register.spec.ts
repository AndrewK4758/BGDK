import { Context, ContextBuilder } from '@bgdk/chain';
import { getCurrentMinute, IInstanceOfGame } from '@bgdk/instance-of-game';
import { GameContextKeys } from '@bgdk/types-game';
import {
  createPlayerID,
  filterAvatar,
  playerCreated,
  registerAction,
  registerOnGameInstance,
  updateLastActive,
} from '../index';

import { ChutesAndLadders } from '@bgdk/chutes-and-ladders';
import { mockMakeGame, mockReqObj, mockRespObj } from '__mocks__/mocks';

let ctx: Context, game: IInstanceOfGame;

describe('test register chain', () => {
  beforeAll(() => {
    game = mockMakeGame(new ChutesAndLadders(5, 5));
    ctx = ContextBuilder.build();
    ctx.put(GameContextKeys.REQUEST, mockReqObj);
    ctx.put(GameContextKeys.RESPONSE, mockRespObj);
    ctx.put(GameContextKeys.ACTION, 'register');
    ctx.put(GameContextKeys.NEXT, '');
    ctx.put(GameContextKeys.GAME, game);
  });
  afterAll(() => {
    ctx.state.clear();
  });
  describe('register chain test', () => {
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
      ctx.put(GameContextKeys.NEXT, 'filter-avatar');
      registerOnGameInstance.execute(ctx);

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
});
