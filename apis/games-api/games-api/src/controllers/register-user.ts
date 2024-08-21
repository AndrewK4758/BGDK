import { IRegisterUser, USER_ROLE } from '@bgdk/types-api';
import { Request, Response } from 'express';
import ShortUniqueId from 'short-unique-id';
import registerUserError from '../errors/register-user-error';
import addUser from '../services/prisma/users/add-user';
import bucket from '../services/gcloud-storage/gcloud-storage-client';
import { createReadStream } from 'fs';

const registerUser = async (req: Request, resp: Response) => {
  try {
    const { firstName, lastName, email, password, playerName } = req.body;
    const thumbnail = req.file;
    const id = new ShortUniqueId().rnd();

    const gcsFilename = `users-thumbnails/${id}`;

    const blob = bucket.file(gcsFilename);

    const blobStream = blob.createWriteStream({ resumable: false });

    blobStream.on('error', err => {
      console.error(err);
      resp.status(500).json({ errorMessage: 'Error uploading file' });
    });

    blobStream.on('finish', () => {
      console.log('File uploaded succesfully');
    });

    const fileStream = createReadStream(thumbnail.path);
    fileStream.pipe(blobStream);

    const registerUser: IRegisterUser = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      createdOn: new Date(),
      password: password,
      playerName: playerName,
      thumbnail: `https://www.googleapis.com/storage/v1/b/bgdk-build-for-deploy/users-thumbnails/${id}`,
      role: USER_ROLE.USER,
    };
    await addUser(registerUser);
    return resp.status(201).json({ message: 'Register User succesful' });
  } catch (err) {
    const { errorMessage } = registerUserError(err.message);
    const error = {
      errorMessage: errorMessage,
      err: err.message,
    };
    return resp.status(422).json(error);
  }
};

export default registerUser;
