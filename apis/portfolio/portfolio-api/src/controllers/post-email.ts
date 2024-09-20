import { Request, Response } from 'express';
import { upload, uploadStorage } from '../routes/routes';

const postEmail = async (req: Request, resp: Response) => {
  console.log(upload);
  console.log(uploadStorage);

  console.log(req);
  try {
    const { name, email, phone, subject, body } = req.body;
    const attachment = req.file;

    console.log(name, email, phone, subject, body);
    console.log(req.files);
    console.log(attachment);
    console.log(typeof attachment);

    setTimeout(
      () =>
        resp.status(201).json({ message: 'Message Sent. Responses are given within 1 day ending in the letter "y"' }),
      2500,
    );
  } catch (error) {
    console.error(error);
  }
};

export default postEmail;
