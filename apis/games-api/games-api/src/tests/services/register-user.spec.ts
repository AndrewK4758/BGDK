import addUser from '../../services/prisma/users/add-user';
import type { IRegisterUser } from '@bgdk/types-api';
import ShortUniqueId from 'short-unique-id';

describe('Test add user service', () => {
  it('should pass and return the details of the newly added user', async () => {
    const id = new ShortUniqueId().rnd();
    const userInfo: IRegisterUser = {
      id: id,
      firstName: 'first',
      lastName: 'last',
      email: `${id}@email.email`,
      createdOn: new Date(),
      password: 'password',
      playerName: 'player-name',
    };

    const newUser = await addUser(userInfo);

    expect(newUser).toBeTruthy();
    expect(newUser.password).not.toEqual(userInfo.password);
    expect(newUser.first_name).toEqual(userInfo.firstName);
  });
});
