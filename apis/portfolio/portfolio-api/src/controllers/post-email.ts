import { Request, Response } from 'express';
import type { SendMailOptions } from 'nodemailer';
import transporter from '../services/nodemailer.ts';

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

    console.log(req.body, '\n\r', req.file);

    const mailOptionsToMe: SendMailOptions = {
      from: 'andrew@andrew-k.us',
      date: date,
      to: 'andrew@andrew-k.us',
      subject: `${subject} - ${date}`,
      text: `${name}\n\r${email}\n\r${phone}\n\r${body}`,
      attachments: attachment
        ? [{ filename: attachment.filename, content: attachment.buffer, contentType: attachment.mimetype }]
        : [],
    };

    const mailOptionsFromMe: SendMailOptions = {
      from: 'andrew@andrew-k.us',
      date: date,
      to: email,
      subject: 'Thank You for Reaching Out',
      text: `${name},\n\r\n\rI usually am able to review messages and respond within 1 day. If it will take longer to respond to this request, I will advise before the day is over.\n\r\nThank You,\n\r\n\rAndrew Klapper\n\rhttps://andrew-k.us`,
    };

    await transporter.sendMail(mailOptionsToMe);

    await transporter.sendMail(mailOptionsFromMe);

    resp.status(201).json({ message: 'Message Sent. Responses are usually given within 1 business day.' });
  } catch (error) {
    console.error(error);
    setTimeout(() => {
      resp.status(500).json({ message: 'Error sending message, please resend' });
    }, 5000);
  }
};

export default postEmail;
