import { prisma } from '@bgdk/prisma';

const findUser = async (email: string) => {
  try {
    return await prisma.users.findUnique({ where: { email: email } });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default findUser;
