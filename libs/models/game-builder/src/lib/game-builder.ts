import { Chain, ChainBuilder, Command } from '@bgdk/chain';
import { IGame } from '@bgdk/game';
import { IRule, Rule } from '@bgdk/rule';

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
  setId(id: string): IGameBuilder;
  setName(name: string): IGameBuilder;
  setDescription(description: string): IGameBuilder;
  setImageURL(imageURL: string): IGameBuilder;
  setRule(order: number, value: string, title: string): IGameBuilder;
  setGameFunctionality(commands: Command[]): IGameBuilder;
  build(): IBuiltGame;
}

export class GameBuilder implements IGameBuilder {
  private Game: IBuiltGame;
  constructor() {
    this.Game = new Object() as IBuiltGame;
    this.Game.rules = [];
  }

  setId(id: string): IGameBuilder {
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
    const rule = new Rule()
      .setOrder(order)
      .setValue(value)
      .setTitle(title)
      .build();
    this.Game.rules.push(rule);
    return this;
  }

  setGameFunctionality(commands: Command[]): IGameBuilder {
    this.Game.commands = commands;
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
