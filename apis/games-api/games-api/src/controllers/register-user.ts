import { IRegisterUser, USER_ROLE } from '@bgdk/types-api';
import { Request, Response } from 'express';
import ShortUniqueId from 'short-unique-id';
import registerUserError from '../errors/register-user-error';
import addUser from '../services/prisma/users/add-user';
import bucket from '../services/gcloud-storage/gcloud-storage-client';
// import { createReadStream } from 'fs';
// import { unlink } from 'fs/promises';

const registerUser = async (req: Request, resp: Response) => {
  try {
    const { firstName, lastName, email, password, playerName } = req.body;
    const thumbnail = req.file;
    const id = new ShortUniqueId().rnd();

    const gcsFilename = `users-thumbnails/${id}`;

    const buffer = bucket.file(gcsFilename);

    await buffer.save(thumbnail.buffer, {
      resumable: false,
      contentType: thumbnail.mimetype,
      onUploadProgress: prog => {
        console.log(prog);
      },
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
    const { errorMessage } = registerUserError(err.message);
    const error = {
      errorMessage: errorMessage,
      err: err.message,
    };
    resp.status(422).json(error);
  }
};

export default registerUser;
