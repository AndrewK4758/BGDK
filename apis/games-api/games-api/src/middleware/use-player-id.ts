import type { IReqObjMaps } from '@bgdk/types-api';
import { GamePlayerValidation } from '@bgdk/types-game';

const usePlayerID = (req: IReqObjMaps) =>
  req.header('current-game') ? (JSON.parse(req.header('current-game') as string) as GamePlayerValidation).playerID : '';

export default usePlayerID;
