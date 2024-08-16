import { prisma } from '@bgdk/prisma';
import { EmailAddress } from '@bgdk/types-api';
import { users } from '@prisma/client';

const findUser = async (email: EmailAddress): Promise<users> => {
  try {
    return await prisma.users.findUnique({ where: { email: email } });
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};

export default findUser;
