// ASK ABOUT DIRECTORY STRUCTURE BEST PRACTICE

import { Chain, ChainBuilder, Command, Context } from '@aklapper/chain';
import { AvatarTotem, ChutesAndLadders, Color, Game, GameBoard, IGame } from '@aklapper/chutes-and-ladders';
import { Request, Response } from 'express';

export interface IRule {
  order: number;
  title?: string;
  value: string;
}

export interface IRuleBuilder {
  setOrder(order: number): IRuleBuilder;
  setValue(value: string): IRuleBuilder;
  setTitle(title: string): IRuleBuilder;
  build(): IRule;
}

export class Rule {
  private rule: IRule;
  constructor() {
    this.rule = new Object() as IRule;
  }
  setOrder(order: number): IRuleBuilder {
    this.rule.order = order;
    return this;
  }
  setValue(value: string): IRuleBuilder {
    if (value) {
      value = value.replace(/[\n|\r] +/g, ' ');
    }
    this.rule.value = value;
    return this;
  }
  setTitle(title: string): IRuleBuilder {
    this.rule.title = title;
    return this;
  }
  build(): IRule {
    return this.rule;
  }
}

//-----------------------------------------------------------------------------------------------------------------//
// GAME BUILDER

export interface IBuiltGame {
  id: string;
  name: string;
  description?: string;
  imageURL?: string;
  rules: IRule[];
  chain: Chain;
  commands: Command[];
  instance: IGame;
}

export interface IGameBuilder {
  seId(id: string): IGameBuilder;
  setName(name: string): IGameBuilder;
  setDescription(description: string): IGameBuilder;
  setImageURL(imageURL: string): IGameBuilder;
  setRule(order: number, value: string, title: string): IGameBuilder;
  setGameFunctionality(commands: Command[]): IGameBuilder;
  setGameInstance(game: ChutesAndLadders): IGameBuilder;
  build(): IBuiltGame;
}

export class GameBuilder implements IGameBuilder {
  private Game: IBuiltGame;
  constructor() {
    this.Game = new Object() as IBuiltGame;
    this.Game.rules = [];
  }

  seId(id: string): IGameBuilder {
    this.Game.id = id;
    return this;
  }

  setName(name: string): IGameBuilder {
    this.Game.name = name;
    return this;
  }

  setDescription(description: string): IGameBuilder {
    this.Game.description = description;
    return this;
  }

  setImageURL(imageURL: string): IGameBuilder {
    this.Game.imageURL = imageURL;
    return this;
  }

  setRule(order: number, title: string, value: string): IGameBuilder {
    const rule = new Rule().setOrder(order).setValue(value).setTitle(title).build();
    this.Game.rules.push(rule);
    return this;
  }

  setGameFunctionality(commands: Command[]): IGameBuilder {
    this.Game.commands = commands;
    return this;
  }

  setGameInstance(game: ChutesAndLadders): IGameBuilder {
    this.Game.instance = new Game(game) as IGame;
    return this;
  }
  build(): IBuiltGame {
    this.Game.chain = ChainBuilder.build(this.Game.commands, true);
    const gameBuildComplete = Object.assign(new Object(), this.Game);
    this.Game = {} as IBuiltGame;
    this.Game.rules = [];
    this.Game.commands = [];

    return gameBuildComplete;
  }
}

//-------------------------------------------------------------------------------------------------------------------
// Type declarations and interfaces

export type Minute = number;

export type GameInstanceID = string;

export type PlayerID = string;

export type GamesInMinute = GameInstanceID[];

export type GamePlayerValidation = {
  gameInstanceID?: GameInstanceID;
  playerID?: string;
};

export type PlayerInTurn = {
  playerInTurn: string;
  playerInTurnID: string;
};

export const enum GameContextKeys {
  GAME = 'GAME',
  REQUEST = 'REQUEST',
  RESPONSE = 'RESPONSE',
  ACTION = 'ACTION',
  NEXT = 'NEXT-HANDLER',
  OUTPUT = 'OUT',
}

export enum TurnStatus {
  VALID = 'VALID PLAYER',
  INVALID = 'INVALID PLAYER',
  NOT_READY = 'GAME NOT READY',
  GAME_WON = 'GAME WON',
}

export interface ILoadRegisterData {
  avatarList: AvatarTotem[];
  avatarColorList: typeof Color;
}

export interface IRegisterLoaderAndFilter extends ILoadRegisterData {
  gamePlayerIDs: GamePlayerValidation;
}

export interface IRegisterFormValues {
  playerName: string;
  avatarName: string;
  avatarColor: Color;
}

export interface IPlayersAndBoard {
  gameBoard: GameBoard;
  activePlayersInGame: IRegisterFormValues[];
  playerInTurn?: string;
  winner?: string;
}

export type ContextData = {
  action: string;
  game: InstanceOfGame;
  req: Request;
  resp: Response;
  next: string;
  output: object;
};

//-------------------------------------------------------------------------------------------------------------//
// util functions

export const deRefContextObject = (context: Context): ContextData => {
  const action = context.get(GameContextKeys.ACTION) as string;
  const game = context.get(GameContextKeys.GAME) as InstanceOfGame;
  const req = context.get(GameContextKeys.REQUEST) as Request;
  const resp = context.get(GameContextKeys.RESPONSE) as Response;
  const next = context.get(GameContextKeys.NEXT) as string;
  const output = context.get(GameContextKeys.OUTPUT) as object;

  return { action: action, game: game, req: req, resp: resp, next: next, output: output };
};

export const getActiveGame = (req: Request) => {
  const __current_game__ = JSON.parse(req.header('__current_game__') as string) as GamePlayerValidation;

  const gameInstanceID = __current_game__.gameInstanceID as string;

  const allGamesMap = req.app.get('allGamesMap') as IAllGamesMap;
  return allGamesMap.AllGames.get(gameInstanceID) as InstanceOfGame;
};

export const getPlayerID = (req: Request) => {
  const __current_game__ = JSON.parse(req.header('__current_game__') as string) as GamePlayerValidation;
  return __current_game__.playerID;
};

//------------------------------------------------------------------------------------------------------------------
// Game instance map

export const getCurrentMinute = (): Minute => (new Date().getHours() * 60 + new Date().getMinutes()) as Minute;

export interface IInstanceOfGame {
  gameInstanceID: GameInstanceID;
  instanceTime: Minute;
  lastActive: Minute;
  instance: IGame;
  updateLastActive(minute: Minute): void;
}

export class InstanceOfGame implements IInstanceOfGame {
  gameInstanceID: GameInstanceID;
  instanceTime: Minute;
  lastActive: Minute;
  instance: IGame;
  constructor(minute: Minute, gameInstanceID: GameInstanceID, instance: IGame) {
    this.instanceTime = minute;
    this.lastActive = minute;
    this.gameInstanceID = gameInstanceID;
    this.instance = instance;
  }

  updateLastActive(minute: Minute): void {
    // GET THE CURRENT MINUTE OF THE DAY
    this.lastActive = minute;
  }
}

//----------------------------------------------------------------------------------
// Map of all active games

export interface IAllGamesMap {
  AllGames: Map<GameInstanceID, InstanceOfGame>;
  addGame(gameInstanceID: GameInstanceID, game: InstanceOfGame): void;
}

export class AllGamesMap implements IAllGamesMap {
  AllGames: Map<GameInstanceID, InstanceOfGame>;
  constructor() {
    this.AllGames = new Map<GameInstanceID, InstanceOfGame>();
  }

  addGame(gameInstanceID: GameInstanceID, game: InstanceOfGame) {
    this.AllGames.set(gameInstanceID, game);
  }
}

//-----------------------------------------------------------------------------------
// Map of all game instances in what minute

export interface IInstanceMap {
  Map: Map<Minute, GamesInMinute>;
  addGameInstance(minute: Minute, gameInstanceID: GameInstanceID): void;
}

export class InstanceMap implements IInstanceMap {
  Map: Map<Minute, GamesInMinute>;
  constructor() {
    this.Map = new Map<Minute, GamesInMinute>();
    for (let i = 0; i < 24 * 60; i++) {
      this.Map.set(i, []);
    }
    this.Map.set(2000, []);
  }

  addGameInstance(minute: Minute, gameInstanceID: GameInstanceID): void {
    this.Map.get(minute)?.push(gameInstanceID);
  }
}

export const reaper = (instanceMap: IInstanceMap) => {
  const now = new Date();
  const startTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  setTimeout(() => {
    let previousDay = instanceMap.Map.get(2000);
    previousDay = [];

    setInterval(() => {
      const minute = getCurrentMinute();
      let valsToMove = instanceMap.Map.get(minute);
      if (valsToMove && previousDay) {
        previousDay.push(...valsToMove);
        valsToMove = [];
      }
    }, 60 * 1000);
  }, startTime.getTime() - now.getTime());
};

//--------------------------------------------------------------------------------------------------------
//ReturnGameFunctionallityLoaderData interface
