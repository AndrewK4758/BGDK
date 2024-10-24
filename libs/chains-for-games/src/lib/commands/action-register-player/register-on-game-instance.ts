import { CommandBuilder } from '@bgdk/chain';
import { deRefContextObject } from '@bgdk/utils';
import { Context, GameContextKeys, IRegisterFormValues, PlayerID } from '@bgdk/types-game';

export const registerOnGameInstance = CommandBuilder.build((context: Context) => {
  if (context.get(GameContextKeys.NEXT) && context.getString(GameContextKeys.NEXT) === 'register-on-game') {
    const { req, game } = deRefContextObject(context);

    const { playerName, avatarName, avatarColor } = req.body as IRegisterFormValues;

    context.put('avatarName', avatarName);
    const playerID = req.playerID ? req.playerID : (context.get('playerID') as PlayerID);

    game.instance.register(playerName, playerID, avatarName, avatarColor);
    context.put(GameContextKeys.NEXT, 'filter-avatar');

    return true;
  } else return false;
});

export default registerOnGameInstance;
