import findUser from '../../services/prisma/users/find-user';
import { EmailAddress } from '@bgdk/types-api';
import { users } from '@prisma/client';

let email: EmailAddress;

describe('Test findUser service', () => {
  it('should pass and return one user according to the email address passed in', async () => {
    email = 'EMAIL@DO-NOT.ERASE';

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
