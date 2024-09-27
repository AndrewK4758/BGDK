// import type { Request } from 'express';
import type { GameNameString } from '@bgdk/types-game';
import type { IReqObjMaps } from '@bgdk/types-api';

const useSetSelectedGameName = (req: IReqObjMaps): GameNameString => req.params['id'].replace(/-/g, ' ');

export default useSetSelectedGameName;
