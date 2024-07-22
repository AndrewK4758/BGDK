import { Context, ContextBuilder } from '@bgdk/chain';
import { ChutesAndLadders } from '@bgdk/chutes-and-ladders';
import { Game } from '@bgdk/game';
import { getCurrentMinute, InstanceOfGame } from '@bgdk/instance-of-game';
import { Color, GameContextKeys, TurnStatus } from '@bgdk/types-game';
import { mockReqObj, mockRespObj } from '__mocks__/mocks';
import { Request, Response } from 'express';
import { sendStartGameStatus, setAvatarsOnStart, setPlayerInTurn, startGame, verifyReadyToPlay } from '../index';

let ctx: Context, instanceOfGame: InstanceOfGame, req: Partial<Request>, resp: Partial<Response>;

describe('execute all steps of starting a game', () => {
  beforeAll(() => {
    ctx = ContextBuilder.build();

    instanceOfGame = new InstanceOfGame(getCurrentMinute(), 'game-ID', new Game(new ChutesAndLadders(5, 5)));

    instanceOfGame.instance.register('player1', 'p-1-id', 'XENOMORPH', Color.RED);
    instanceOfGame.instance.register('player2', 'p-2-id', 'PREDATOR', Color.BLACK);

    req = mockReqObj();
    resp = mockRespObj();

    ctx.put(GameContextKeys.ACTION, 'start');
    ctx.put(GameContextKeys.REQUEST, req);
    ctx.put(GameContextKeys.RESPONSE, resp);
    ctx.put(GameContextKeys.GAME, instanceOfGame);
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
    expect(instanceOfGame.instance.playersArray.length).toEqual(2);
  });

  it('should fail and put message on out prop of ctx obj', () => {
    ctx.put(GameContextKeys.NEXT, 'verify-ready-to-play');
    instanceOfGame.instance.playersArray.splice(1);
    const output = { gameStatus: TurnStatus.NOT_READY };

    const commandResult = verifyReadyToPlay.execute(ctx);

    expect(commandResult).toBeFalsy();
    expect(ctx.get(GameContextKeys.OUTPUT)).toEqual(output);
  });

  it('should pass and place avatars on startspace and set order prop on player', () => {
    ctx.put(GameContextKeys.NEXT, 'set-avatars-on-start');
    ctx.put('ready-to-play', true);

    const commandResult = setAvatarsOnStart.execute(ctx);

    expect(commandResult).toBeTruthy();
    instanceOfGame.instance.playersArray.forEach(p => {
      expect(p.avatar.location).toEqual(instanceOfGame.instance.instance.startSpace);
      expect(p.order).toBeTruthy();
    });
  });
  it('should fail', () => {
    ctx.put(GameContextKeys.NEXT, 'set-avatars-on-start');
    ctx.put('ready-to-play', false);
    const commandResult = setAvatarsOnStart.execute(ctx);
    expect(commandResult).toBeFalsy();
  });

  it('should pass and set the player in turn to the first player in the players array', () => {
    ctx.put(GameContextKeys.NEXT, 'set-player-in-turn');
    const commandResult = setPlayerInTurn.execute(ctx);
    expect(commandResult).toBeTruthy();
    expect(instanceOfGame.instance.playerInTurn).toEqual(instanceOfGame.instance.playersArray[0]);
    expect(instanceOfGame.instance.playerInTurn).not.toEqual(instanceOfGame.instance.playersArray[1]);
  });

  it('should pass and add a message to the out prop of ctx obj', () => {
    ctx.put(GameContextKeys.NEXT, 'send-start-game-status');
    const output = { message: 'Game Started' };
    const commandResult = sendStartGameStatus.execute(ctx);
    expect(commandResult).toBeTruthy();
    expect(ctx.get(GameContextKeys.OUTPUT)).toEqual(output);
  });
});