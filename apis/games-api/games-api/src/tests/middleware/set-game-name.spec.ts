import { IReqObjMaps } from '@bgdk/types-api';
import useSetSelectedGameName from '../../middleware/set-selected-game-name';
import { mockReqObj } from '__mocks__/mocks.mts';

let req: Partial<IReqObjMaps>;

describe('Test use selected game name middleware', () => {
  beforeAll(() => {
    req = mockReqObj() as Partial<IReqObjMaps>;

    req.params['id'] = 'Game-Name-To-Test';
  });

  it('Should pass and remove the dashes in the id property', () => {
    req.selectedGameName = useSetSelectedGameName(req as IReqObjMaps);

    expect(req.selectedGameName).toEqual('Game Name To Test');
  });
});
