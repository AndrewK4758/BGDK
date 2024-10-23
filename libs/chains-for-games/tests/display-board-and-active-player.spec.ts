import { ContextBuilder } from '@bgdk/chain';
import { ChutesAndLadders, TOTAL_SPACES } from '@bgdk/chutes-and-ladders';
import { Game } from '@bgdk/game';
import { InstanceOfGame, getCurrentMinute } from '@bgdk/instance-of-game';
import { Context, Color, GameContextKeys, IRegisterFormValues } from '@bgdk/types-game';
import { mockReqObj, mockRespObj } from '__mocks__/mocks.js';
import { Request, Response } from 'express';
import { IPlayersAndBoard } from '../src/lib/completed-chains/active-game-display-chain';
import { activeDataToSend } from '../src/lib/commands/action-board/active-game-data-to-send';
import { boardStart } from '../src/lib/commands/action-board/board-start';
import { checkIfWinner } from '../src/lib/commands/action-board/check-if-winner';
import { readyToPlayCheck } from '../src/lib/commands/action-board/ready-to-play';

let ctx: Context, game: InstanceOfGame, req: Partial<Request>, resp: Partial<Response>;

describe('test display board and active player chain', () => {
  beforeEach(() => {
    ctx = ContextBuilder.build();
    req = mockReqObj();
    resp = mockRespObj();

    game = new InstanceOfGame(getCurrentMinute(), 'game-ID', new Game(new ChutesAndLadders(5, 5)));

    game.instance.register('player1', 'p-1-id', 'XENOMORPH', Color.RED);
    game.instance.register('player2', 'p-2-id', 'PREDATOR', Color.BLACK);

    ctx.put(GameContextKeys.ACTION, 'board');
    ctx.put(GameContextKeys.REQUEST, req);
    ctx.put(GameContextKeys.RESPONSE, resp);
    ctx.put(GameContextKeys.GAME, game);
  });
  it('should return all players registered in the game instance', () => {
    const commandResult = boardStart.execute(ctx);

    expect(commandResult).toBeTruthy();
    expect((ctx.get('active-players-in-game') as IRegisterFormValues[]).length).toEqual(2);
    expect(ctx.getString(GameContextKeys.NEXT)).toEqual('ready-to-play-check');
  });
  it('should check if game is ready to play and put player in turn on ctx object to display', () => {
    ctx.put(GameContextKeys.NEXT, 'ready-to-play-check');
    const commandResult = readyToPlayCheck.execute(ctx);

    expect(commandResult).toBeTruthy();
    expect(ctx.get('player-in-turn')).toEqual('Waiting for game to start');
    expect(ctx.getString(GameContextKeys.NEXT)).toEqual('check-if-winner');
  });

  it('should check if player in turn has won', () => {
    ctx.put(GameContextKeys.NEXT, 'check-if-winner');
    const commandResult = checkIfWinner.execute(ctx);

    expect(commandResult).toBeTruthy();
    expect(ctx.get('winner-message')).toEqual('');
    expect(ctx.getString(GameContextKeys.NEXT)).toEqual('active-data-to-send');
  });

  it('should add all data necessary to show active game details to context object', () => {
    const playerInTurn = 'Waiting for game to start';

    const activePlayersInGame: IRegisterFormValues[] = [
      {
        playerName: game.instance.playersArray[0].name,
        avatarName: game.instance.playersArray[0].avatar.name,
        avatarColor: game.instance.playersArray[0].avatar.color,
      },
      {
        playerName: game.instance.playersArray[1].name,
        avatarName: game.instance.playersArray[1].avatar.name,
        avatarColor: game.instance.playersArray[1].avatar.color,
      },
    ];

    ctx.put('active-players-in-game', activePlayersInGame);
    ctx.put('player-in-turn', playerInTurn);
    ctx.put('winner-message', '');

    ctx.put(GameContextKeys.NEXT, 'active-data-to-send');

    const commandResult = activeDataToSend.execute(ctx);

    const dataToSendFromCtx = ctx.get(GameContextKeys.OUTPUT) as IPlayersAndBoard;

    expect(commandResult).toBeTruthy();
    expect(dataToSendFromCtx.avatarInTurn).toEqual('Waiting for game to start');
    expect(dataToSendFromCtx.gameBoard.length).toEqual(TOTAL_SPACES);
    expect(dataToSendFromCtx.activePlayersInGame.length).toEqual(2);
    expect(dataToSendFromCtx.winner).toEqual('');
  });
});
