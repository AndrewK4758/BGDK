import { Context, ContextBuilder } from '@aklapper/chain';
import { IPlayer } from '@aklapper/chutes-and-ladders';
import { IGame } from '@aklapper/game';
import { GameBoard, GameContextKeys } from '@aklapper/game-types';
import { deRefContextObject } from '@aklapper/de-referencing-utilities';
import { IInstanceOfGame } from '@aklapper/instance-of-game';
import { mockGameWithPlayersAdded } from '__mocks__/mocks';
import { flipHaveWinnerFlag, makeGameBoard, resetGame } from '../index';

let ctx: Context, game: IInstanceOfGame, player1: IPlayer, player2: IPlayer;
describe('test reset game chain', () => {
  beforeAll(() => {
    game = mockGameWithPlayersAdded();
    ctx = ContextBuilder.build();

    player1 = game.instance.playersArray[0];
    player2 = game.instance.playersArray[1];

    player1.avatar.move(1);
    player2.avatar.move(2);

    ctx.put(GameContextKeys.ACTION, 'reset');
    ctx.put(GameContextKeys.GAME, game);
  });
  afterAll(() => {
    ctx.state.clear();
  });
  describe('it should reset game', () => {
    it('should show start space as empty then return both players to startspace', () => {
      expect(game.instance.instance.startSpace.occupied).toBeFalsy();

      if (
        !game.instance.instance.startSpace.next.special &&
        !game.instance.instance.startSpace.next.next.special
      ) {
        expect(
          game.instance.instance.startSpace.next.avatarsInSpace[0].name
        ).toBe('XENOMORPH');
        expect(
          game.instance.instance.startSpace.next.next.avatarsInSpace[0].name
        ).toBe('PREDATOR');
      }

      const commandResult = resetGame.execute(ctx);

      expect(commandResult).toBeTruthy();
    });

    it('should flip have winner flag on game', () => {
      ctx.put(GameContextKeys.NEXT, 'flip-have-winner-flag');

      const commandResult = flipHaveWinnerFlag.execute(ctx);

      expect(commandResult).toBeTruthy();
      expect((ctx.get(GameContextKeys.GAME) as IGame).haveWinner).toBeFalsy();
    });

    it('should make new gameboard and send to start game chain', () => {
      ctx.put(GameContextKeys.NEXT, 'make-game-board');
      const { game } = deRefContextObject(ctx);

      const oldBoard: GameBoard = game.instance.instance.displayGameBoard();

      const commandResult = makeGameBoard.execute(ctx);

      const newBoard: GameBoard = game.instance.instance.displayGameBoard();

      expect(commandResult).toBeTruthy();
      expect(oldBoard === newBoard).toBeFalsy();
      expect(ctx.get(GameContextKeys.ACTION)).toEqual('start');
    });
  });
});
