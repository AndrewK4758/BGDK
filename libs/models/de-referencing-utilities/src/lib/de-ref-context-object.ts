import { Context } from '@bgdk/chain';
import { IInstanceOfGame } from '@bgdk/instance-of-game';
import { IReqObjMaps } from '@bgdk/types-api';
import { GameContextKeys } from '@bgdk/types-game';
import { Response } from 'express';
import { Server, Socket } from 'socket.io';

export type ContextData = {
  action: string;
  game: IInstanceOfGame;
  req: IReqObjMaps;
  resp: Response;
  next: string;
  output: object;
  socket: Socket;
  io: Server;
};

export const deRefContextObject = (context: Context): ContextData => {
  const action = context.get(GameContextKeys.ACTION) as string;
  const game = context.get(GameContextKeys.GAME) as IInstanceOfGame;
  const req = context.get(GameContextKeys.REQUEST) as IReqObjMaps;
  const resp = context.get(GameContextKeys.RESPONSE) as Response;
  const next = context.get(GameContextKeys.NEXT) as string;
  const output = context.get(GameContextKeys.OUTPUT) as object;
  const socket = context.get(GameContextKeys.SOCKET) as Socket;
  const io = context.get(GameContextKeys.IO) as Server;

  return {
    action: action,
    game: game,
    req: req,
    resp: resp,
    next: next,
    output: output,
    socket: socket,
    io: io,
  };
};
