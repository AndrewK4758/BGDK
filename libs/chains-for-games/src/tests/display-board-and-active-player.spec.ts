import { Context, ContextBuilder } from '@bgdk/chain';
import {
  GameContextKeys,
  IPlayersAndBoard,
  IRegisterFormValues,
} from '@bgdk/game-types';
import { IInstanceOfGame } from '@bgdk/instance-of-game';
import {
  activeDataToSend,
  activePlayers,
  checkIfWinner,
  readyToPlayCheck,
} from '../index';

import {
  mockGameWithPlayersAdded,
  mockReqObj,
  mockRespObj,
} from '__mocks__/mocks';

let ctx: Context, game: IInstanceOfGame;
describe('test display board and active player chain', () => {
  beforeAll(() => {
    game = mockGameWithPlayersAdded();
    ctx = ContextBuilder.build();

    ctx.put(GameContextKeys.ACTION, 'board');
    ctx.put(GameContextKeys.REQUEST, mockReqObj);
    ctx.put(GameContextKeys.RESPONSE, mockRespObj);
    ctx.put(GameContextKeys.GAME, game);
  });

  afterAll(() => {
    ctx.state.clear();
  });

  it('should return all players registered in the game instance', () => {
    const commandResult = activePlayers.execute(ctx);

    expect(commandResult).toBeTruthy();
    expect(
      (ctx.get('active-players-in-game') as IRegisterFormValues[]).length
    ).toEqual(2);
    expect(ctx.getString(GameContextKeys.NEXT)).toEqual('ready-to-play-check');
  });
  describe(`Test the chain that checks and displays active instances' active players, ready to play prop, check if winner prop, data sent to client to show active game info`, () => {
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
      expect(ctx.getString(GameContextKeys.NEXT)).toEqual(
        'active-data-to-send'
      );
    });

    it('should add all data necessary to show active game details to context object', () => {
      ctx.put(GameContextKeys.NEXT, 'active-data-to-send');
      const commandResult = activeDataToSend.execute(ctx);

      const dataToSendFromCtx = ctx.get(
        GameContextKeys.OUTPUT
      ) as IPlayersAndBoard;

      expect(commandResult).toBeTruthy();
      expect(dataToSendFromCtx.avatarInTurn).toEqual(
        'Waiting for game to start'
      );
      // expect(dataToSendFromCtx.gameBoard.length).toEqual(10);
      expect(dataToSendFromCtx.activePlayersInGame.length).toEqual(2);
      expect(dataToSendFromCtx.winner).toEqual('');
    });
  });
});
