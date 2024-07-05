import { ContextBuilder } from '@bgdk/chain';
import { GameContextKeys } from '@bgdk/types-game';
import { IInstanceOfGame } from '@bgdk/instance-of-game';
import { Server } from 'socket.io';
import { ChutesAndLaddersGame } from './list-games';

//figure out how to make dynamic action

const performActionWs = (io: Server, game: IInstanceOfGame, action: string) => {
  console.log('Web-Socket Action Called');
  console.log(`ACTION: ${action}`);
  if (game) {
    const ctx = ContextBuilder.build();
    ctx.put(GameContextKeys.ACTION, action);
    ctx.put(GameContextKeys.IO, io);
    ctx.put(GameContextKeys.GAME, game);

    ChutesAndLaddersGame.chain.execute(ctx);
  } else {
    io.emit('no-game-error', 'GAME NOT FOUND');
  }
};

export default performActionWs;
