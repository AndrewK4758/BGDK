import { Request, Response } from 'express';
import type { SendMailOptions } from 'nodemailer';
import createTransporter from '../services/nodemailer';

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
      from: 'info@andrew-k.us',
      date: date,
      to: 'andrew@andrew-k.us',
      subject: `${subject} - ${date}`,
      text: `Sender Info:\n\rName: ${name}\n\rEmail: ${email}\n\rPhone: ${phone}\n\rMessage: ${body}`,
      attachments: attachment
        ? [{ filename: attachment.filename, content: attachment.buffer, contentType: attachment.mimetype }]
        : [],
    };

    const mailOptionsFromMe: SendMailOptions = {
      from: 'andrew@andrew-k.us',
      date: date,
      to: email,
      subject: `Thank You for Reaching Out`,
      text: `${name},\n\r\n\rI usually am able to review messages and respond within 1 day. If I will take longer to respond, I will advise before the day is over.\n\r\nThank You,\n\r\n\rAndrew Klapper\n\rhttps://andrew-k.us`,
    };

    const transporter = await createTransporter();

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
