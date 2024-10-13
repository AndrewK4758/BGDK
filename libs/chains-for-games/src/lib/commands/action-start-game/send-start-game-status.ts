import { CommandBuilder, Context } from '@bgdk/chain';
import { deRefContextObject } from '@bgdk/de-referencing-utilities';
import type { Avatar } from '@bgdk/games-components-logic';
import { GameContextKeys, GameInstanceID } from '@bgdk/types-game';

export const sendStartGameStatus = CommandBuilder.build((context: Context) => {
  if (context.get(GameContextKeys.NEXT) && context.getString(GameContextKeys.NEXT) === 'send-start-game-status') {
    const { game, req, resp } = deRefContextObject(context);

    const playersInOrder: { [key: string]: string } = {};
    game.instance.playersArray.forEach(
      ({ avatar, id }: { avatar: Avatar; id: string }) => (playersInOrder[avatar.name as string] = id),
    );
    resp.setHeader('current-game', req.header('current-game') as GameInstanceID);
    context.put(GameContextKeys.OUTPUT, { message: 'Game Started', playersInOrder });
    return true;
  } else return false;
});
