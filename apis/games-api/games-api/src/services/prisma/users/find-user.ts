import { prisma } from '@bgdk/prisma';
import { users, type Prisma } from '@prisma/client';
import type { DefaultArgs } from '@prisma/client/runtime/library';

const findUser = async (query: Prisma.usersFindUniqueArgs<DefaultArgs>): Promise<users> => {
  try {
    return await prisma.users.findUnique(query);
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};

export default findUser;
