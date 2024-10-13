import { IRegisterUser, USER_ROLE } from '@bgdk/types-api';
import { Request, Response } from 'express';
import ShortUniqueId from 'short-unique-id';
import registerUserError from '../errors/register-user-error.ts';
import addUser from '../services/prisma/users/add-user.ts';
import bucket from '../services/gcloud-storage/gcloud-storage-client.ts';

const registerUser = async (req: Request, resp: Response) => {
  try {
    const { firstName, lastName, email, password, playerName } = req.body;
    const thumbnail = req.file;
    const id = new ShortUniqueId().rnd();

    const gcsFilename = `users-thumbnails/${id}`;

    const buffer = bucket.file(gcsFilename);

    await buffer.save((thumbnail as Express.Multer.File).buffer, {
      resumable: false,
      contentType: (thumbnail as Express.Multer.File).mimetype,
    });

    const registerUser: IRegisterUser = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      createdOn: new Date(),
      password: password,
      playerName: playerName,
      thumbnail: `https://storage.googleapis.com/bgdk-build-for-deploy/users-thumbnails/${id}`,
      role: USER_ROLE.USER,
    };

    await addUser(registerUser);
    resp.status(201).json({ message: 'Register User succesful' });
  } catch (err) {
    console.error(err);
    const { errorMessage } = registerUserError((err as Error).message);
    const error = {
      errorMessage: errorMessage,
      err: (err as Error).message,
    };
    resp.status(422).json(error);
  }
};

export default registerUser;
