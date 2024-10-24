import { CommandBuilder } from '@bgdk/chain';
import { deRefContextObject } from '@bgdk/utils';
import { Context, GameContextKeys, GameInstanceID } from '@bgdk/types-game';

export const sendStartGameStatus = CommandBuilder.build((context: Context) => {
  if (context.get(GameContextKeys.NEXT) && context.getString(GameContextKeys.NEXT) === 'send-start-game-status') {
    const { game, req, resp } = deRefContextObject(context);

    const playersInOrder: { [key: string]: string } = {};
    game.instance.playersArray.forEach(player => (playersInOrder[player.avatar.name as string] = player.id));
    resp.setHeader('current-game', req.header('current-game') as GameInstanceID);
    context.put(GameContextKeys.OUTPUT, { message: 'Game Started', playersInOrder });
    return true;
  } else return false;
});

export default sendStartGameStatus;
