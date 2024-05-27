import { Context, ContextBuilder } from '@aklapper/chain';
import { ChutesAndLadders } from '@aklapper/chutes-and-ladders';
import { GameContextKeys, InstanceOfGame } from '@aklapper/model';

import {
  sendStartGameStatus,
  setAvatarsOnStart,
  setPlayerInTurn,
  startGame,
  verifyReadyToPlay,
} from '../index';

import {
  mockAddPlayersToGame,
  mockMakeGame,
  mockReqObj,
  mockRespObj,
} from '__mocks__/mocks';

let ctx: Context, game: InstanceOfGame;
beforeAll(() => {
  ctx = ContextBuilder.build();
  game = mockMakeGame(new ChutesAndLadders(5, 5));

  if (game) mockAddPlayersToGame(game);

  ctx.put(GameContextKeys.ACTION, 'start');
  ctx.put(GameContextKeys.GAME, game);
  ctx.put(GameContextKeys.REQUEST, mockReqObj);
  ctx.put(GameContextKeys.RESPONSE, mockRespObj);
});
describe('execute all steps of starting a game', () => {
  describe('test start game command', () => {
    it('should verify the context action is start and send to next-handler', () => {
      const commandResult = startGame.execute(ctx);

      expect(commandResult).toBeTruthy();
      expect(ctx.getString(GameContextKeys.NEXT)).toEqual(
        'verify-ready-to-play'
      );
    });

    it('should fail', () => {
      ctx.put(GameContextKeys.ACTION, 'something-else');

      const commandResult = startGame.execute(ctx);

      expect(commandResult).toBeFalsy();
    });
  });

  describe('test verify ready to play command', () => {
    it('should verify the game is ready to play', () => {
      ctx.put(GameContextKeys.NEXT, 'verify-ready-to-play');
      const commandResult = verifyReadyToPlay.execute(ctx);

      expect(commandResult).toBeTruthy();
      expect(ctx.get('ready-to-play')).toBeTruthy();
      expect(game.instance.playersArray.length).toEqual(2);
    });

    it('should fail and put message on out prop of ctx obj', () => {
      ctx.put(GameContextKeys.NEXT, 'verify-ready-to-play');
      game.instance.playersArray.splice(1);
      const output = { gameStatus: 'Game Not Ready to Start' };

      const commandResult = verifyReadyToPlay.execute(ctx);

      expect(commandResult).toBeFalsy();
      expect(ctx.get(GameContextKeys.OUTPUT)).toEqual(output);
    });
  });

  describe('test set avatars on start', () => {
    it('should pass and place avatars on startspace and set order prop on player', () => {
      ctx.put(GameContextKeys.NEXT, 'set-avatars-on-start');
      ctx.put('ready-to-play', true);

      const commandResult = setAvatarsOnStart.execute(ctx);

      expect(commandResult).toBeTruthy();
      game.instance.playersArray.forEach((p) => {
        expect(p.avatar.location).toEqual(game.instance.instance.startSpace);
        expect(p.order).toBeTruthy();
      });
    });

    it('should fail', () => {
      ctx.put(GameContextKeys.NEXT, 'set-avatars-on-start');
      ctx.put('ready-to-play', false);

      const commandResult = setAvatarsOnStart.execute(ctx);

      expect(commandResult).toBeFalsy();
    });
  });

  describe('test set player in turn', () => {
    it('should pass and set the player in turn to the first player in the players array', () => {
      ctx.put(GameContextKeys.NEXT, 'set-player-in-turn');

      const commandResult = setPlayerInTurn.execute(ctx);

      expect(commandResult).toBeTruthy();
      expect(game.instance.playerInTurn).toEqual(game.instance.playersArray[0]);
      expect(game.instance.playerInTurn).not.toEqual(
        game.instance.playersArray[1]
      );
    });
  });

  describe('test send start game status', () => {
    it('should pass and add a message to the out prop of ctx obj', () => {
      ctx.put(GameContextKeys.NEXT, 'send-start-game-status');
      const output = { message: 'Game Started' };

      const commandResult = sendStartGameStatus.execute(ctx);

      expect(commandResult).toBeTruthy();
      expect(ctx.get(GameContextKeys.OUTPUT)).toEqual(output);
    });
  });
});
