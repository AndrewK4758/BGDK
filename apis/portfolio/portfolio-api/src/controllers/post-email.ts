import { Request, Response } from 'express';
import type { SendMailOptions } from 'nodemailer';
import transporter from '../services/nodemailer';

type ContactMessage = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  body: string;
  date: Date;
};

type ContactMessageAttachment = Express.Multer.File;

const postEmail = async (req: Request, resp: Response) => {
  try {
    const { name, email, phone, subject, body, date } = req.body as ContactMessage;
    const attachment = req.file as ContactMessageAttachment;

    console.log(req.body);

    const mailOptions: SendMailOptions = {
      from: 'ak475826@gmail.com',
      to: email,
      subject: `${subject} - ${date}`,
      text: `${name}, ${phone}, ${body}`,
      attachments: attachment
        ? [{ filename: attachment.filename, content: attachment.buffer, contentType: attachment.mimetype }]
        : [],
    };

    const sentMail = await transporter.sendMail(mailOptions);

    console.log(sentMail);

    setTimeout(() => {
      resp.status(201).json({ message: 'Message Sent. Responses are given within 1 day ending in the letter "y"' });
    }, 5000);
  } catch (error) {
    console.error(error);
    setTimeout(() => {
      resp.status(500).json({ message: 'Error sending message, please resend' });
    }, 5000);
  }
};

export default postEmail;
