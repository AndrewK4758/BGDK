import { prisma } from '@bgdk/prisma';
import { users, type Prisma } from '@prisma/client';
import type { DefaultArgs } from '@prisma/client/runtime/library';

const findUser = async (query: Prisma.usersFindUniqueArgs<DefaultArgs>): Promise<users | null> => {
  try {
    return await prisma.users.findUnique(query);
  } catch (error) {
    const err = error as Error;
    console.error(err);
    throw new Error(err.message);
  }
};

export default findUser;
