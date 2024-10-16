import { Chain, Command } from '@bgdk/chain';
import { IRule } from '@bgdk/rule';
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
export declare class GameBuilder implements IGameBuilder {
    #private;
    constructor();
    setId(id: string): IGameBuilder;
    setName(name: string): IGameBuilder;
    setDescription(description: string): IGameBuilder;
    setImageURL(imageURL: string): IGameBuilder;
    setRule(order: number, title: string, value: string): IGameBuilder;
    setGameFunctionality(commands: Command[], continueOnError: boolean): IGameBuilder;
    setInstance<T>(instance: () => T): IGameBuilder;
    build(): IBuiltGame;
}
//# sourceMappingURL=game-builder.d.ts.map