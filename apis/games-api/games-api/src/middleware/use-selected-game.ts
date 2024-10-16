import { IBuiltGame } from '@bgdk/game-builder';
import { IReqObjMaps } from '@bgdk/types-api';
import games from '../data/games-list.js';

const useSelectedGame = (req: IReqObjMaps): IBuiltGame => games.find(({ name }) => name === req.selectedGameName);

export default useSelectedGame;
