import { ContextBuilder } from '@bgdk/chain';
import { activeGameDisplayChain } from '@bgdk/chains-for-games';
import { getActiveGameWS } from '@bgdk/de-referencing-utilities';
import { GameContextKeys, GameInstanceID } from '@bgdk/game-types';
import { IInstanceOfGame } from '@bgdk/instance-of-game';
import { Server } from 'socket.io';
import { app } from '../main';

//figure out how to make dynamic action

const performActionWs = (io: Server, gameID: GameInstanceID) => {
  console.log('Web-Socket Action Called');

  const game = getActiveGameWS(
    gameID,
    app.get('allGamesMap')
  ) as IInstanceOfGame;
  const ctx = ContextBuilder.build();
  if (game) {
    console.log('IN GAME: ', game.gameInstanceID, ' INSTANCE');
    ctx.put(GameContextKeys.ACTION, 'board');
    ctx.put(GameContextKeys.IO, io);
    ctx.put(GameContextKeys.GAME, game);

    activeGameDisplayChain.execute(ctx);
  } else {
    io.emit('no-game-error', 'GAME NOT FOUND');
  }
};

export default performActionWs;
