import { Context, ContextBuilder } from '@bgdk/chain';
import { ChutesAndLadders } from '@bgdk/chutes-and-ladders';
import { deRefContextObject } from '@bgdk/de-referencing-utilities';
import { Game } from '@bgdk/game';
import { InstanceOfGame, getCurrentMinute } from '@bgdk/instance-of-game';
import { GameContextKeys, Color } from '@bgdk/types-game';
import { resetGame } from '../lib/commands/action-reset-game/reset-game-start.js';
import { flipHaveWinnerFlag } from '../lib/commands/action-reset-game/flip-winner-flag.js';
import { makeNewGameBoard } from '../lib/commands/action-reset-game/make-new-game-board.js';
import { GameBoard, Player } from '@bgdk/games-components-logic';
import { mockReqObj } from '__mocks__/mocks.js';
import { Request } from 'express';

let ctx: Context,
  instanceOfGame: InstanceOfGame,
  player1: Player,
  player2: Player,
  instance: ChutesAndLadders,
  game: Game,
  req: Partial<Request>;
describe('test reset game chain', () => {
  beforeAll(() => {
    instance = new ChutesAndLadders(5, 5);
    game = new Game(instance);
    instanceOfGame = new InstanceOfGame(getCurrentMinute(), 'game-ID', game);
    instanceOfGame.instance.register('player1', 'p-1-id', 'XENOMORPH', Color.RED);
    instanceOfGame.instance.register('player2', 'p-2-id', 'PREDATOR', Color.BLACK);

    player1 = instanceOfGame.instance.playersArray[0];
    player2 = instanceOfGame.instance.playersArray[1];

    instanceOfGame.instance.instance.startSpace.land(player1.avatar);
    instanceOfGame.instance.instance.startSpace.land(player2.avatar);

    player1.avatar.move(1);
    player2.avatar.move(2);

    req = mockReqObj();

    if (req.params) req.params['id'] = 'Chutes-&-Ladders';

    ctx = ContextBuilder.build();
    ctx.put(GameContextKeys.ACTION, 'reset');
    ctx.put(GameContextKeys.GAME, instanceOfGame);
    ctx.put(GameContextKeys.REQUEST, req);
  });

  describe('it should reset game', () => {
    it('should show start space as empty then return both players to startspace', () => {
      expect(instanceOfGame.instance.instance.startSpace.occupied).toBeFalsy();

      const commandResult = resetGame.execute(ctx);

      expect(commandResult).toBeTruthy();
    });

    it('should flip have winner flag on game', () => {
      ctx.put(GameContextKeys.NEXT, 'flip-winner-flag');

      const commandResult = flipHaveWinnerFlag.execute(ctx);

      expect(commandResult).toBeTruthy();
      expect((ctx.get(GameContextKeys.GAME) as Game).haveWinner).toBeFalsy();
    });

    it('should make new gameboard and send to start game chain', () => {
      ctx.put(GameContextKeys.NEXT, 'make-game-board');
      const { game } = deRefContextObject(ctx);

      const oldBoard: GameBoard = game.instance.instance.displayGameBoard();

      const commandResult = makeNewGameBoard.execute(ctx);

      const newBoard: GameBoard = game.instance.instance.displayGameBoard();

      expect(commandResult).toBeTruthy();
      expect(oldBoard === newBoard).toBeFalsy();
      expect(ctx.get(GameContextKeys.ACTION)).toEqual('start');
    });
  });
});
