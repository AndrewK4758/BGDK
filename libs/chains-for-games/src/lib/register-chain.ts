import { ChainBuilder, CommandBuilder, Context } from '@aklapper/chain';
import { deRefContextObject } from '@aklapper/model';
import { getCurrentMinute } from '@aklapper/instance-of-game';
import {
  AvatarTotem,
  GameContextKeys,
  GamePlayerValidation,
  IRegisterFormValues,
  PlayerID,
} from '@aklapper/game-types';
import ShortUniqueId from 'short-unique-id';

export const registerAction = CommandBuilder.build((context: Context) => {
  if (
    context.get(GameContextKeys.ACTION) &&
    context.getString(GameContextKeys.ACTION) === 'register'
  ) {
    context.put(GameContextKeys.NEXT, 'create-playerID');
    return true;
  } else return false;
});
export const createPlayerID = CommandBuilder.build((context: Context) => {
  if (
    context.get(GameContextKeys.NEXT) &&
    context.getString(GameContextKeys.NEXT) === 'create-playerID'
  ) {
    const playerID = new ShortUniqueId().rnd();
    context.put('playerID', playerID as string);
    context.put(GameContextKeys.NEXT, 'register-on-game');
    return true;
  } else return false;
});
export const registerOnGameInstance = CommandBuilder.build(
  (context: Context) => {
    if (
      context.get(GameContextKeys.NEXT) &&
      context.getString(GameContextKeys.NEXT) === 'register-on-game'
    ) {
      const { req, game } = deRefContextObject(context);
      console.log(`ID OF GAME: ${game.gameInstanceID}`);

      const { playerName, avatarName, avatarColor } =
        req.body as IRegisterFormValues;

      context.put('avatarName', avatarName);
      const playerID = context.get('playerID') as PlayerID;

      game.instance.register(playerName, playerID, avatarName, avatarColor);
      context.put(GameContextKeys.NEXT, 'filter-avatar');

      return true;
    } else return false;
  }
);
export const filterAvatar = CommandBuilder.build((context: Context) => {
  if (
    context.get(GameContextKeys.NEXT) &&
    context.getString(GameContextKeys.NEXT) === 'filter-avatar'
  ) {
    const { game } = deRefContextObject(context);

    const avatarName = context.get('avatarName');
    game.instance.instance.avatarList =
      game.instance.instance.avatarList.filter(
        (a: AvatarTotem) => a.name !== avatarName
      );

    context.put(GameContextKeys.NEXT, 'update-last-active');
    return true;
  } else return false;
});
export const updateLastActive = CommandBuilder.build((context: Context) => {
  if (
    context.get(GameContextKeys.NEXT) &&
    context.getString(GameContextKeys.NEXT) === 'update-last-active'
  ) {
    const { game } = deRefContextObject(context);

    game.updateLastActive(getCurrentMinute());

    context.put(GameContextKeys.NEXT, 'player-created');

    return true;
  } else return false;
});
export const playerCreated = CommandBuilder.build((context: Context) => {
  if (
    context.get(GameContextKeys.NEXT) &&
    context.getString(GameContextKeys.NEXT) === 'player-created'
  ) {
    const { req, resp } = deRefContextObject(context);

    const __current_game__: GamePlayerValidation = JSON.parse(
      req.header('current-game') as string
    );

    __current_game__.playerID = context.get('playerID') as PlayerID;

    resp.setHeader('current-game', JSON.stringify(__current_game__));

    context.put(GameContextKeys.OUTPUT, { message: 'Player Created' });
    return true;
  } else return false;
});

export const registerChain = ChainBuilder.build(
  [
    registerAction,
    createPlayerID,
    registerOnGameInstance,
    filterAvatar,
    updateLastActive,
    playerCreated,
  ],
  false
);
