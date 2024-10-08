import { Chain, ChainBuilder, Command } from '@bgdk/chain';
import { Rule, IRule } from '@bgdk/rule';

export interface IBuiltGame {
  id: string;
  name: string;
  description?: string;
  imageURL?: string;
  rules: IRule[];
  chain: Chain | null;
  instance(): unknown;
}

export interface IGameBuilder {
  setId(id: string): IGameBuilder;
  setName(name: string): IGameBuilder;
  setDescription(description: string): IGameBuilder;
  setImageURL(imageURL: string): IGameBuilder;
  setRule(order: number, value: string, title: string): IGameBuilder;
  setGameFunctionality(commands: Command[], continueOnError: boolean): IGameBuilder;
  setInstance<T>(instance: () => T): IGameBuilder;
  build(): IBuiltGame;
}

export class GameBuilder implements IGameBuilder {
  #Game: IBuiltGame;
  constructor() {
    this.#Game = new Object() as IBuiltGame;
    this.#Game.rules = [];
  }

  setId(id: string): IGameBuilder {
    this.#Game.id = id;
    return this;
  }

  setName(name: string): IGameBuilder {
    this.#Game.name = name;
    return this;
  }

  setDescription(description: string): IGameBuilder {
    this.#Game.description = description;
    return this;
  }

  setImageURL(imageURL: string): IGameBuilder {
    this.#Game.imageURL = imageURL;
    return this;
  }

  setRule(order: number, title: string, value: string): IGameBuilder {
    const rule = new Rule().setOrder(order).setValue(value).setTitle(title).build();
    this.#Game.rules.push(rule);
    return this;
  }

  setGameFunctionality(commands: Command[], continueOnError: boolean): IGameBuilder {
    this.#Game.chain = ChainBuilder.build(commands, continueOnError);
    return this;
  }

  setInstance<T>(instance: () => T): IGameBuilder {
    this.#Game.instance = instance;
    return this;
  }

  build(): IBuiltGame {
    const gameBuildComplete = Object.assign(new Object() as IBuiltGame, this.#Game);
    this.#Game = {} as IBuiltGame;
    this.#Game.rules = [];
    this.#Game.chain = null;
    this.#Game.instance = () => null;

    return gameBuildComplete;
  }
}
