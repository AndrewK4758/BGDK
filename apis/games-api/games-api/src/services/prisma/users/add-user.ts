import { generatePassword } from '@bgdk/password';
import { prisma } from '@bgdk/prisma';
import type { IRegisterUser } from '@bgdk/types-api';
import { users } from '@prisma/client';

const addUser = async ({
  id,
  firstName,
  lastName,
  email,
  createdOn,
  password,
  playerName,
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
        role: role,
      },
    });
  } catch (err) {
    if (err.meta.target[0] === 'email') {
      console.error(err);
      throw new Error('Email is already registered');
    } else {
      throw new Error(err.message);
    }
  }
};

export default addUser;
