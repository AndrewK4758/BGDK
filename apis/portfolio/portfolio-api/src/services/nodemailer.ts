import { createTransport } from 'nodemailer';
import { configDotenv } from 'dotenv';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import { resolve } from 'path';
import { cwd } from 'process';
import cca from './masl';

configDotenv({
  path: resolve(cwd(), './apis/portfolio/portfolio-api/env/.env'),
});

const getToken = async () => {
  const { accessToken } = await cca.acquireTokenByClientCredential({
    scopes: ['https://graph.microsoft.com/SMTP.Send/.default'],
  });
  return accessToken;
};

const nodemailerConfigOptions: SMTPTransport.Options = {
  // service: process.env.MAIL_SERVICE,
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT, 10),
  secure: false,
  auth: {
    accessToken: await getToken(),
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false,
  },
};

const transporter = createTransport(nodemailerConfigOptions);

export default transporter;

// console.log(
//   process.env.MAIL_USERNAME,
//   process.env.MAIL_PASSWORD,
//   process.env.MAIL_SERVICE,
//   process.env.MAIL_HOST,
//   parseInt(process.env.MAIL_PORT, 10),
// );

// transporter.verify();
