import { activePlayers, readyToPlayCheck, checkIfWinner, activeDataToSend } from '../index';
import { ContextBuilder, Context } from '@aklapper/chain';
import {
  IRegisterFormValues,
  IPlayersAndBoard,
  InstanceOfGame,
  getCurrentMinute,
  GameContextKeys,
} from '@aklapper/model';
import { ChutesAndLadders, Game } from '@aklapper/chutes-and-ladders';
import { mockReqObj, mockRespObj, mockAddPlayersToGame } from './__mocks__/__mock_';

let ctx: Context, game: InstanceOfGame;

describe(`Test the chain that checks and displays active instances' active players, ready to play prop, check if winner prop, data sent to client to show active game info`, () => {
  beforeAll(() => {
    ctx = ContextBuilder.build();
    game = new InstanceOfGame(getCurrentMinute(), 'gameID', new Game(new ChutesAndLadders(5, 5)));

    mockAddPlayersToGame(game);

    ctx.put(GameContextKeys.GAME, game);
    ctx.put(GameContextKeys.ACTION, 'board');
    ctx.put(GameContextKeys.REQUEST, mockReqObj);
    ctx.put(GameContextKeys.RESPONSE, mockRespObj);
  });

  it('should return all players registered in the game instance', () => {
    const commandResult = activePlayers.execute(ctx);

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
    ctx.put(GameContextKeys.NEXT, 'active-data-to-send');
    const commandResult = activeDataToSend.execute(ctx);

    const dataToSendFromCtx = ctx.get(GameContextKeys.OUTPUT) as IPlayersAndBoard;

    expect(commandResult).toBeTruthy();
    expect(dataToSendFromCtx.playerInTurn).toEqual('Waiting for game to start');
    expect(dataToSendFromCtx.gameBoard.length).toEqual(10);
    expect(dataToSendFromCtx.activePlayersInGame.length).toEqual(2);
    expect(dataToSendFromCtx.message).toEqual('');
  });
});
