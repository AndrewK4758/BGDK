import { Context, ContextBuilder } from '@aklapper/chain';
import { GameBoard, IGame, IPlayer } from '@aklapper/chutes-and-ladders';
import {
  GameContextKeys,
  InstanceOfGame,
  deRefContextObject,
} from '@aklapper/model';
import { mockGameWithPlayersAdded } from '__mocks__/mocks';
import { flipHaveWinnerFlag, makeGameBoard, resetGame } from '../index';

let ctx: Context, game: InstanceOfGame, player1: IPlayer, player2: IPlayer;
describe('test reset game chain', () => {
  beforeAll(() => {
    if (ctx) ctx.state.clear();
    ctx = ContextBuilder.build();

    game = mockGameWithPlayersAdded();

    ctx.put(GameContextKeys.GAME, game);
    ctx.put(GameContextKeys.ACTION, 'reset');

    player1 = game.instance.playersArray[0];
    player2 = game.instance.playersArray[1];

    player1.avatar.move(1);
    player2.avatar.move(2);
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