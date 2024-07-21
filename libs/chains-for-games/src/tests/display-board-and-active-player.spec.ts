import { Context, ContextBuilder } from '@bgdk/chain';
import { IPlayersAndBoard } from '../index';
import { Color, GameContextKeys, IRegisterFormValues } from '@bgdk/types-game';
import { activeDataToSend, activePlayers, checkIfWinner, readyToPlayCheck } from '../index';
import { InstanceOfGame, getCurrentMinute } from '@bgdk/instance-of-game';
import { Game } from '@bgdk/game';
import { ChutesAndLadders, TOTAL_SPACES } from '@bgdk/chutes-and-ladders';
import { mockReqObj, mockRespObj } from '__mocks__/mocks';

let ctx: Context, game: InstanceOfGame, instance: ChutesAndLadders;
describe('test display board and active player chain', () => {
  beforeEach(() => {
    instance = new ChutesAndLadders(5, 5);
    game = new InstanceOfGame(getCurrentMinute(), 'game-ID', new Game(instance));

    game.instance.register('player1', 'p-1-id', 'XENOMORPH', Color.RED);
    game.instance.register('player2', 'p-2-id', 'PREDATOR', Color.BLACK);

    ctx = ContextBuilder.build();

    ctx.put(GameContextKeys.ACTION, 'board');
    ctx.put(GameContextKeys.REQUEST, mockReqObj);
    ctx.put(GameContextKeys.RESPONSE, mockRespObj);
    ctx.put(GameContextKeys.GAME, game);
  });

  afterEach(() => {
    ctx.state.clear();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should return all players registered in the game instance', () => {
    const commandResult = activePlayers.execute(ctx);

    expect(commandResult).toBeTruthy();
    expect((ctx.get('active-players-in-game') as IRegisterFormValues[]).length).toEqual(2);
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
      expect(ctx.getString(GameContextKeys.NEXT)).toEqual('active-data-to-send');
    });

    it('should add all data necessary to show active game details to context object', () => {
      ctx.put(GameContextKeys.NEXT, 'active-data-to-send');

      const playerInTurn = game.instance.readyToPlay
        ? game.instance.playerInTurn.avatar.name
        : 'Waiting for game to start';

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

      const commandResult = activeDataToSend.execute(ctx);

      const dataToSendFromCtx = ctx.get(GameContextKeys.OUTPUT) as IPlayersAndBoard;

      expect(commandResult).toBeTruthy();
      expect(dataToSendFromCtx.avatarInTurn).toEqual('Waiting for game to start');
      expect(dataToSendFromCtx.gameBoard.length).toEqual(TOTAL_SPACES);
      expect(dataToSendFromCtx.activePlayersInGame.length).toEqual(2);
      expect(dataToSendFromCtx.winner).toEqual('');
    });
  });
});
