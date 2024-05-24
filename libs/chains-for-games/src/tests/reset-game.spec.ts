import { resetGame, flipHaveWinnerFlag, makeGameBoard } from '../index';
import { ContextBuilder, Context } from '@aklapper/chain';
import { GameContextKeys, InstanceOfGame, deRefContextObject, getCurrentMinute } from '@aklapper/model';
import { ChutesAndLadders, Game, GameBoard, IGame } from '@aklapper/chutes-and-ladders';
import { mockAddPlayersToGame } from './__mocks__/__mock_';

let ctx: Context, game: InstanceOfGame;

describe('it should reset game', () => {
  beforeAll(() => {
    ctx = ContextBuilder.build();

    game = new InstanceOfGame(getCurrentMinute(), 'game-ID', new Game(new ChutesAndLadders(5, 5)));
    mockAddPlayersToGame(game);

    ctx.put(GameContextKeys.GAME, game);
    ctx.put(GameContextKeys.ACTION, 'reset');
  });

  beforeEach(() => {
    game.instance.instance.startSpace.next.land(game.instance.playersArray[0].avatar);
    game.instance.instance.startSpace.next.next.land(game.instance.playersArray[1].avatar);
  });

  afterEach(() => {
    game.instance.playersArray[0].avatar.location.leave();
    game.instance.playersArray[1].avatar.location.leave();
  });

  it('should show start space as empty then return both players to startspace', () => {
    expect(game.instance.instance.startSpace.occupied).toBeFalsy();

    if (!game.instance.instance.startSpace.next.special && !game.instance.instance.startSpace.next.next.special) {
      expect(game.instance.instance.startSpace.next.avatarsInSpace[0].name).toBe('XENOMORPH');
      expect(game.instance.instance.startSpace.next.next.avatarsInSpace[0].name).toBe('PREDATOR');
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
