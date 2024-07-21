import { ContextBuilder } from '@bgdk/chain';
import { getActiveGame } from '@bgdk/de-referencing-utilities';
import { InstanceOfGame } from '@bgdk/instance-of-game';
import { IReqObjMaps } from '@bgdk/types-api';
import { GameContextKeys } from '@bgdk/types-game';
import { Response } from 'express';
import SocketServer from '../services/socket-io/socket-server';
import { ChutesAndLaddersGame } from './list-games';

const performAction = (req: IReqObjMaps, resp: Response, gameWS: InstanceOfGame, actionWS: string) => {
  console.log('Perform Action Called');
  if (!req && !resp) {
    if (gameWS) {
      const ctx = ContextBuilder.build();
      ctx.put(GameContextKeys.ACTION, actionWS);
      ctx.put(GameContextKeys.IO, SocketServer.instance.io);
      ctx.put(GameContextKeys.GAME, gameWS);

      ChutesAndLaddersGame.chain.execute(ctx);
    } else {
      SocketServer.instance.io.emit('no-game-error', 'GAME NOT FOUND');
    }
  } else {
    const game = getActiveGame(req) as InstanceOfGame;
    console.log(`Got Game: ${JSON.stringify(game.gameInstanceID)}: ${game.instance.instance.constructor.name}`);
    if (game) {
      const { action } = req.params;
      const ctx = ContextBuilder.build();
      ctx.put(GameContextKeys.ACTION, action);
      ctx.put(GameContextKeys.GAME, game);
      ctx.put(GameContextKeys.REQUEST, req);
      ctx.put(GameContextKeys.RESPONSE, resp);
      ctx.put(GameContextKeys.NEXT, '');

      ChutesAndLaddersGame.chain.execute(ctx);
    } else {
      resp.sendStatus(404);
    }
  }
};

export default performAction;