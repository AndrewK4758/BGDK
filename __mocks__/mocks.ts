import {
  IAvatar,
  Avatar,
  Player,
  ChutesAndLadders,
  IPlayer,
} from '../libs/chutes-and-ladders/src';
import { Color } from '../libs/game-types/src';
import { Game } from '../libs/game/src';
import {
  GamePlayerValidation,
  getCurrentMinute,
  InstanceOfGame,
  IRegisterFormValues,
} from '../libs/model/src';
import { Request, Response } from 'express';

export const mockMakeGame = (game: ChutesAndLadders) =>
  new InstanceOfGame(getCurrentMinute(), 'game-ID', new Game(game));

export const mockReqObj: Partial<Request> = {
  body: {
    playerName: 'Player Name',
    avatarName: 'XENOMORPH',
    avatarColor: Color.BLACK,
  } as IRegisterFormValues,

  header: jest.fn().mockImplementation((name: string) => {
    const headers = new Map<string, string>();
    const __current_game__ = {
      gameInstanceID: 'game-ID',
      playerID: 'player-2-ID',
    } as GamePlayerValidation;

    headers.set('current-game', JSON.stringify(__current_game__));

    return headers.get(name);
  }),
};

export const mockRespObj: Partial<Response> = {
  setHeader: jest
    .fn()
    .mockImplementation((name: string, headerValue: string) => {
      const headers = new Map<string, string>();

      headers.set(name, headerValue);
    }),
  status: jest.fn().mockImplementation((code) => {
    mockRespObj.status = code;
    return mockRespObj;
  }),
  sendStatus: jest
    .fn()
    .mockImplementation((result) => (mockRespObj.status = result)),
  json: jest.fn().mockImplementation((result) => (mockRespObj.json = result)),
};

export const mockAddPlayersToGame = (game: InstanceOfGame) => {
  const p1: IPlayer = new Player('player1', 'player-1-ID');
  const p2: IPlayer = new Player('player2', 'player-2-ID');

  const a1: IAvatar = new Avatar('XENOMORPH', Color.BLACK);
  const a2: IAvatar = new Avatar('PREDATOR', Color.RED);

  p1.avatar = a1;
  p2.avatar = a2;

  p1.order = 1;
  p2.order = 2;

  game.instance.playersArray[0] = p1;
  game.instance.playersArray[1] = p2;

  game.instance.instance.startSpace.land(a1);
  game.instance.instance.startSpace.land(a2);
};

export const mockGameWithPlayersAdded = (): InstanceOfGame => {
  const instance = new ChutesAndLadders(5, 5);
  const game = mockMakeGame(instance);
  mockAddPlayersToGame(game);
  return game;
};