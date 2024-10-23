import { CommandBuilder } from '@bgdk/chain';
import { deRefContextObject } from '@bgdk/de-referencing-utilities';
import { Context, GameContextKeys, GamePlayerValidation, getCurrentMinute, PlayerID } from '@bgdk/types-game';

export const playerCreated = CommandBuilder.build((context: Context) => {
  if (context.get(GameContextKeys.NEXT) && context.getString(GameContextKeys.NEXT) === 'player-created') {
    const { game, req, resp } = deRefContextObject(context);

    game.updateLastActive(getCurrentMinute());

    const __current_game__: GamePlayerValidation = JSON.parse(req.header('current-game') as string);

    __current_game__.playerID = req.playerID ? req.playerID : (context.get('playerID') as PlayerID);

    resp.setHeader('current-game', JSON.stringify(__current_game__));

    context.put(GameContextKeys.OUTPUT, {
      message: 'Player Created',
    });
    return true;
  } else return false;
});

export default playerCreated;
