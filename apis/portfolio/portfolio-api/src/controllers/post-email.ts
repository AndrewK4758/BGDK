import { Request, Response } from 'express';

const postEmail = async (req: Request, resp: Response) => {
  try {
    const { name, email, phone, subject, body, date } = req.body;
    const attachment = req.file;

    console.log(name, email, phone, subject, body, date);
    console.log(req.files);
    console.log(attachment);

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
