import { IRegisterUser, USER_ROLE } from '@bgdk/types-api';
import { Request, Response } from 'express';
import ShortUniqueId from 'short-unique-id';
import registerUserError from '../errors/register-user-error';
import addUser from '../services/prisma/users/add-user';

const registerUser = async (req: Request, resp: Response) => {
  try {
    const { firstName, lastName, email, password, playerName } = req.body;
    const id = new ShortUniqueId().rnd();

    const registerUser: IRegisterUser = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      createdOn: new Date(),
      password: password,
      playerName: playerName,
      role: USER_ROLE.USER,
    };

    await addUser(registerUser);
    resp.status(201).json({ message: 'Register User succesful' });
  } catch (err) {
    console.error(err);
    resp.status(400).json(registerUserError());
  }
};

export default registerUser;
