import { Command } from './chain';
import { IBuiltGame } from './built-game';
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
//# sourceMappingURL=game-builder.d.ts.map