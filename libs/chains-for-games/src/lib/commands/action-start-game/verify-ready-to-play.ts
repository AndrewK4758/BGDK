import { CommandBuilder } from '@bgdk/chain';
import { deRefContextObject } from '@bgdk/de-referencing-utilities';
import { Context, GameContextKeys, TurnStatus } from '@bgdk/types-game';
import { nextCommandMap } from '../../utils/context-next-map';

export const verifyReadyToPlay = CommandBuilder.build((context: Context) => {
  if (context.get(GameContextKeys.NEXT) && context.getString(GameContextKeys.NEXT) === 'verify-ready-to-play') {
    const { game, req } = deRefContextObject(context);

    const readyToPlay = game.instance.verifyReadyToPlay(
      game.instance.instance.MIN_PLAYERS,
      game.instance.instance.MAX_PLAYERS,
    );

    if (readyToPlay) {
      context.put('ready-to-play', readyToPlay);
      const gameName = (context.get('req-params-id') as string) ?? (req.params['id'] as string);
      const nextCommand = nextCommandMap.get(gameName)?.get(context.getString(GameContextKeys.NEXT));
      context.put(GameContextKeys.NEXT, nextCommand);
      return true;
    } else {
      context.put(GameContextKeys.OUTPUT, {
        gameStatus: TurnStatus.NOT_READY,
      });
      return false;
    }
  } else return false;
});

export default verifyReadyToPlay;
