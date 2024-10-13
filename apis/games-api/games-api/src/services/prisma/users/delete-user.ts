import { prisma } from '@bgdk/prisma';
import type { EmailAddress } from '@bgdk/types-api';

const deleteUser = async (email: EmailAddress) => {
  try {
    return await prisma.users.delete({ where: { email: email } });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default deleteUser;
