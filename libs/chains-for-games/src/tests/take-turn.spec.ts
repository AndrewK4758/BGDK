import { Context, ContextBuilder } from '@bgdk/chain';
import { Player, IPlayer } from '@bgdk/games-components-logic';
import { ChutesAndLadders } from '@bgdk/chutes-and-ladders';
import { getCurrentMinute, InstanceOfGame } from '@bgdk/instance-of-game';
import { GameContextKeys, SpaceType, TurnStatus, Color } from '@bgdk/types-game';
import { Avatar } from '@bgdk/games-components-logic';
import { moveAvatar, rollDice, rotatePlayer, takeTurn, verifyPlayer, wonGame } from '../index';
import { mockReqObj, mockRespObj } from '__mocks__/mocks';
import { Game } from '@bgdk/game';

interface ICtxOutput {
  turnStatus: TurnStatus;
}

let ctx: Context,
  instanceOfGame: InstanceOfGame,
  game: Game,
  output: ICtxOutput,
  turnStatus: TurnStatus,
  instance: ChutesAndLadders,
  player1: Avatar,
  player2: Avatar;

describe('should execute all steps of taking turn', () => {
  beforeEach(() => {
    ctx = ContextBuilder.build();
    instance = new ChutesAndLadders(5, 5);
    game = new Game(instance);
    instanceOfGame = new InstanceOfGame(getCurrentMinute(), 'game-ID', game);

    game.register('player1', 'p-1-id', 'XENOMORPH', Color.RED);
    game.register('player2', 'p-2-id', 'PREDATOR', Color.BLACK);

    player1 = game.playersArray[0].avatar;
    player2 = game.playersArray[1].avatar;

    instance.startSpace.land(player1);
    instance.startSpace.land(player2);

    instanceOfGame.instance.playerInTurn = instanceOfGame.instance.playersArray.find(
      ({ id }) => id === 'p-2-id',
    ) as IPlayer;

    turnStatus = TurnStatus.NOT_READY;
    output = { turnStatus: turnStatus };

    ctx.put(GameContextKeys.ACTION, 'take-turn');
    ctx.put(GameContextKeys.REQUEST, mockReqObj);
    ctx.put(GameContextKeys.RESPONSE, mockRespObj);
    ctx.put(GameContextKeys.GAME, instanceOfGame);
  });

  it('should fail because game is in NOT_READY state when receiving a turn ', () => {
    const commandResult = takeTurn.execute(ctx);

    expect(commandResult).toBeFalsy();
    expect(ctx.get(GameContextKeys.OUTPUT)).toEqual(output);
  });

  it('should fail because game is in GAME_WON state when receiving a turn', () => {
    game.readyToPlay = true;
    game.haveWinner = true;

    output = { turnStatus: TurnStatus.GAME_WON };
    const commandResult = takeTurn.execute(ctx);

    expect(commandResult).toBeFalsy();
    expect(ctx.get(GameContextKeys.OUTPUT)).toEqual(output);
  });

  it('should pass to next command', () => {
    instanceOfGame.instance.readyToPlay = true;
    instanceOfGame.instance.haveWinner = false;

    const commandResult = takeTurn.execute(ctx);

    expect(commandResult).toBeTruthy();
    expect(instanceOfGame.lastActive).toEqual(getCurrentMinute());
    expect(ctx.getString(GameContextKeys.NEXT)).toEqual('verify-player');
  });

  it('should fail for incorrect ACTION on ctx obj', () => {
    ctx.put(GameContextKeys.ACTION, 'register');
    const commandResult = takeTurn.execute(ctx);

    expect(commandResult).toBeFalsy();
  });

  it('should pass to roll-dice', () => {
    ctx.put(GameContextKeys.NEXT, 'verify-player');

    const commandResult = verifyPlayer.execute(ctx);

    expect(commandResult).toBeTruthy();
    expect(ctx.get('player-taking-turn')).toEqual(instanceOfGame.instance.playerInTurn as IPlayer);
  });

  it('should fail due to incorrect player taking turn', () => {
    ctx.put(GameContextKeys.NEXT, 'verify-player');

    instanceOfGame.instance.playerInTurn = new Player('player', 'id');
    output = { turnStatus: TurnStatus.INVALID };
    const commandResult = verifyPlayer.execute(ctx);
    expect(commandResult).toBeFalsy();
    expect(ctx.get(GameContextKeys.OUTPUT)).toEqual(output);
  });

  it('should fail for incorrect next-handler', () => {
    ctx.put(GameContextKeys.NEXT, 'something-else');

    const commandResult = verifyPlayer.execute(ctx);

    expect(commandResult).toBeFalsy();
  });

  it('should pass and add a moveDist prop to ctx obj. moveDist value is between 1 and number of sides of Die in Game', () => {
    ctx.put(GameContextKeys.NEXT, 'roll-dice');
    const commandResult = rollDice.execute(ctx);

    expect(commandResult).toBeTruthy();
    expect(ctx.get('moveDist')).toBeGreaterThanOrEqual(1);
    expect(ctx.get('moveDist')).toBeLessThanOrEqual(instanceOfGame.instance.instance.DIE.sides);
  });
  it('should fail', () => {
    ctx.put(GameContextKeys.NEXT, 'something-else');

    const commandResult = rollDice.execute(ctx);

    expect(commandResult).toBeFalsy();
  });

  it('should pass with out prop of ctx obj being a valid turn status and update the location of player in turn avatar', () => {
    ctx.put(GameContextKeys.NEXT, 'move-avatar');
    output = { turnStatus: TurnStatus.VALID };

    const moveDist = instanceOfGame.instance.instance.DIE.roll() as number;

    ctx.put('player-taking-turn', instanceOfGame.instance.playerInTurn);
    ctx.put('moveDist', moveDist);

    const commandResult = moveAvatar.execute(ctx);

    expect(commandResult).toBeTruthy();
    expect((ctx.get('player-taking-turn') as IPlayer).avatar.location.type).toEqual(SpaceType.NORMAL);
    expect(ctx.get(GameContextKeys.OUTPUT)).toEqual(output);
  });

  it('should fail', () => {
    ctx.put(GameContextKeys.NEXT, 'something-else');

    const commandResult = moveAvatar.execute(ctx);

    expect(commandResult).toBeFalsy();
  });

  it('should pass and send ctx to next command in chain', () => {
    ctx.put(GameContextKeys.NEXT, 'won-game');

    const playerTakingTurn = instanceOfGame.instance.playersArray[0] as IPlayer;
    playerTakingTurn.avatar.location = instanceOfGame.instance.instance.startSpace;

    ctx.put('player-taking-turn', playerTakingTurn);
    const commandResult = wonGame.execute(ctx);

    expect(commandResult).toBeTruthy();
    expect(ctx.getString(GameContextKeys.NEXT)).toEqual('rotate-player');
  });

  it('should fail and flip haveWinner flag in game instance to true', () => {
    ctx.put(GameContextKeys.NEXT, 'won-game');

    const playerTakingTurn = instanceOfGame.instance.playerInTurn as IPlayer;
    instanceOfGame.instance.instance.startSpace.land(playerTakingTurn.avatar);

    while (playerTakingTurn.avatar.location.next) {
      playerTakingTurn.avatar.location = playerTakingTurn.avatar.location.next;
    }

    ctx.put('player-taking-turn', playerTakingTurn);

    const commandResult = wonGame.execute(ctx);

    expect(commandResult).toBeFalsy();
    expect(instanceOfGame.instance.haveWinner).toBeTruthy();
  });

  it('should pass and rotate player in turn within the active players array in game instance', () => {
    ctx.put(GameContextKeys.NEXT, 'rotate-player');

    const commandResult = rotatePlayer.execute(ctx);

    expect(commandResult).toBeTruthy();
    expect(instanceOfGame.instance.playerInTurn).toEqual(instanceOfGame.instance.playersArray[1]);
  });

  it('should fail', () => {
    ctx.put(GameContextKeys.NEXT, 'something-else');

    const commandResult = rotatePlayer.execute(ctx);

    expect(commandResult).toBeFalsy();
  });
});
