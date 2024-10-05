import findUser from '../../services/prisma/users/find-user';
import { EmailAddress, USER_ROLE, type IRegisterUser } from '@bgdk/types-api';
import { users } from '@prisma/client';
import addUser from '../../services/prisma/users/add-user';
import deleteUser from '../../services/prisma/users/delete-user';

let email: EmailAddress, user: IRegisterUser;

describe('Test findUser service', () => {
  beforeAll(async () => {
    user = {
      firstName: 'FIRST',
      id: '123456',
      lastName: 'LAST',
      email: 'DONT@DELETE.COM',
      createdOn: new Date(),
      password: 'PASSWORD',
      playerName: 'PLAYER',
      role: USER_ROLE.USER,
    };
    await addUser(user);
  });

  afterAll(async () => {
    await deleteUser(user.email);
  });
  it('should pass and return one user according to the email address passed in', async () => {
    email = 'DONT@DELETE.COM';

    const user: users = await findUser(email);

    expect(user).toBeTruthy();
    expect(user.email).toEqual(email);
  });

  it('Should fail and throw error with the message stating email is not unique', async () => {
    email = 'NOT@IN.DATABASE';

    const user: users = await findUser(email);

    expect(user).toBeNull();
  });
});
