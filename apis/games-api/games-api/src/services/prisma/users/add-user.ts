import { generatePassword } from '@bgdk/password';
import { prisma } from '@bgdk/prisma';
import type { IRegisterUser } from '@bgdk/types-api';
import { users } from '@prisma/client';
import { type PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const addUser = async ({
  id,
  firstName,
  lastName,
  email,
  createdOn,
  password,
  playerName,
  thumbnail,
  role,
}: IRegisterUser): Promise<users> => {
  const hashPassword = await generatePassword(password);
  try {
    return await prisma.users.create({
      data: {
        id: id,
        first_name: firstName,
        last_name: lastName,
        email: email,
        created_on: createdOn,
        password: hashPassword,
        player_name: playerName,
        thumbnail: thumbnail as string,
        role: role,
      },
    });
  } catch (error) {
    const err = error as PrismaClientKnownRequestError;
    if (err) {
      console.error((err.meta as Record<string, string>).target[0] === 'email');
      throw new Error('Email is already registered');
    } else {
      throw new Error((error as Error).message);
    }
  }
};

export default addUser;
