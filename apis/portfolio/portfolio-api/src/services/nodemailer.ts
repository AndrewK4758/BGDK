import { createTransport } from 'nodemailer';
import { configDotenv } from 'dotenv';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import { resolve } from 'path';
import { cwd } from 'process';

configDotenv({
  path: resolve(cwd(), './apis/portfolio/portfolio-api/env/.env'),
});

const nodemailerConfigOptions: SMTPTransport.Options = {
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT, 10),
  secure: false,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
};

const transporter = createTransport(nodemailerConfigOptions);

export default transporter;
