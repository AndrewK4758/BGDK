import { ContextBuilder } from '@bgdk/chain';
import { GameContextKeys } from '@bgdk/types-game';
import { IInstanceOfGame } from '@bgdk/instance-of-game';
import { ChutesAndLaddersGame } from './list-games';
import SocketServer from '../services/socket-io/socket-server';

//figure out how to make dynamic action

const performActionWs = (game: IInstanceOfGame, action: string) => {
  console.log('Web-Socket Action Called');

  if (game) {
    const ctx = ContextBuilder.build();
    ctx.put(GameContextKeys.ACTION, action);
    ctx.put(GameContextKeys.IO, SocketServer.instance.io);
    ctx.put(GameContextKeys.GAME, game);

    ChutesAndLaddersGame.chain.execute(ctx);
  } else {
    SocketServer.instance.io.emit('no-game-error', 'GAME NOT FOUND');
  }
};

export default performActionWs;
