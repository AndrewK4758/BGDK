import { Context, ContextBuilder } from '@bgdk/chain';
import { ChutesAndLadders } from '@bgdk/chutes-and-ladders';
import { Game } from '@bgdk/game';
import { getCurrentMinute, InstanceOfGame } from '@bgdk/instance-of-game';
import { GameContextKeys, Color, TurnStatus } from '@bgdk/types-game';
import { mockReqObj, mockRespObj } from '__mocks__/mocks.mts';
import { sendStartGameStatus } from '../lib/commands/action-start-game/send-start-game-status.ts';
import { setAvatarOnStartChutesAndLadders } from '../lib/commands/action-start-game/set-on-start-chutes-and-ladders.ts';
import { setPlayerInTurn } from '../lib/commands/action-start-game/set-player-in-turn.ts';
import { startGame } from '../lib/commands/action-start-game/start-game-start.ts';
import { verifyReadyToPlay } from '../lib/commands/action-start-game/verify-ready-to-play.ts';
import { Request, Response } from 'express';

let ctx: Context,
  instanceOfGame: InstanceOfGame,
  game: Game,
  instance: ChutesAndLadders,
  req: Partial<Request>,
  resp: Partial<Response>;

describe('execute all steps of starting a game', () => {
  beforeAll(() => {
    ctx = ContextBuilder.build();

    instance = new ChutesAndLadders(5, 5);
    game = new Game(instance);
    instanceOfGame = new InstanceOfGame(getCurrentMinute(), 'game-ID', game);

    game.register('player1', 'p-1-id', 'XENOMORPH', Color.RED);
    game.register('player2', 'p-2-id', 'PREDATOR', Color.BLACK);

    req = mockReqObj();
    resp = mockRespObj();

    ctx.put(GameContextKeys.ACTION, 'start');
    ctx.put(GameContextKeys.REQUEST, req);
    ctx.put(GameContextKeys.RESPONSE, resp);
    ctx.put(GameContextKeys.GAME, instanceOfGame);
  });

  afterAll(() => {
    ctx.state.clear();
  });

  it('should verify the context action is start and send to next-handler', () => {
    const commandResult = startGame.execute(ctx);

    expect(commandResult).toBeTruthy();
    expect(ctx.getString(GameContextKeys.NEXT)).toEqual('verify-ready-to-play');
  });

  it('should fail', () => {
    ctx.put(GameContextKeys.ACTION, 'something-else');

    const commandResult = startGame.execute(ctx);

    expect(commandResult).toBeFalsy();
  });

  it('should verify the game is ready to play', () => {
    ctx.put(GameContextKeys.NEXT, 'verify-ready-to-play');
    const commandResult = verifyReadyToPlay.execute(ctx);

    expect(commandResult).toBeTruthy();
    expect(ctx.get('ready-to-play')).toBeTruthy();
    expect(game.playersArray.length).toEqual(2);
  });

  it('should fail and put message on out prop of ctx obj', () => {
    ctx.put(GameContextKeys.NEXT, 'verify-ready-to-play');
    game.playersArray.splice(1);
    const output = { gameStatus: TurnStatus.NOT_READY };

    const commandResult = verifyReadyToPlay.execute(ctx);

    expect(commandResult).toBeFalsy();
    expect(ctx.get(GameContextKeys.OUTPUT)).toEqual(output);
  });

  it('should pass and place avatars on startspace and set order prop on player', () => {
    ctx.put(GameContextKeys.NEXT, 'set-avatars-on-start');
    ctx.put('ready-to-play', true);

    const commandResult = setAvatarOnStartChutesAndLadders.execute(ctx);

    expect(commandResult).toBeTruthy();
    game.playersArray.forEach(p => {
      expect(p.avatar.location).toEqual(game.instance.startSpace);
      expect(p.order).toBeTruthy();
    });
  });
  it('should fail', () => {
    ctx.put(GameContextKeys.NEXT, 'set-avatars-on-start');
    ctx.put('ready-to-play', false);
    const commandResult = setAvatarOnStartChutesAndLadders.execute(ctx);
    expect(commandResult).toBeFalsy();
  });

  it('should pass and set the player in turn to the first player in the players array', () => {
    ctx.put(GameContextKeys.NEXT, 'set-player-in-turn');
    const commandResult = setPlayerInTurn.execute(ctx);
    expect(commandResult).toBeTruthy();
    expect(game.playerInTurn).toEqual(game.playersArray[0]);
    expect(game.playerInTurn).not.toEqual(game.playersArray[1]);
  });

  it('should pass and add a message to the out prop of ctx obj', () => {
    ctx.put(GameContextKeys.NEXT, 'send-start-game-status');
    const output = { message: 'Game Started' };
    const commandResult = sendStartGameStatus.execute(ctx);
    expect(commandResult).toBeTruthy();
    expect(ctx.get(GameContextKeys.OUTPUT)).toEqual(output);
  });
});
