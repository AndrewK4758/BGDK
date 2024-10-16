import findUser from '../../services/prisma/users/find-user.js';
import { EmailAddress, USER_ROLE, type IRegisterUser } from '@bgdk/types-api';
import { users, type Prisma } from '@prisma/client';
import addUser from '../../services/prisma/users/add-user.js';
import deleteUser from '../../services/prisma/users/delete-user.js';
import type { DefaultArgs } from '@prisma/client/runtime/library';

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

    const query: Prisma.usersFindUniqueArgs<DefaultArgs> = {
      where: {
        email: email,
      },
    };
    const user: users = await findUser(query);

    expect(user).toBeTruthy();
    expect(user.email).toEqual(email);
  });

  it('Should fail and throw error with the message stating email is not unique', async () => {
    email = 'NOT@IN.DATABASE';

    const query: Prisma.usersFindUniqueArgs<DefaultArgs> = {
      where: {
        email: email,
      },
    };
    const user: users = await findUser(query);

    expect(user).toBeNull();
  });
});
