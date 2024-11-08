import { createTransport } from 'nodemailer';
import { configDotenv } from 'dotenv';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import { resolve } from 'path';
import { cwd } from 'process';
import cca from './masl.ts';
import type { AuthenticationResult } from '@azure/msal-node';

configDotenv({
  path: resolve(cwd(), './apis/portfolio/portfolio-api/env/.env'),
});

const getToken = async () => {
  const { accessToken } = (await cca.acquireTokenByClientCredential({
    scopes: ['api://portfolio/.default'],
  })) as AuthenticationResult;
  return accessToken;
};

const createTransporter = async () => {
  const accessToken = await getToken();

  const nodemailerConfigOptions: SMTPTransport.Options = {
    service: process.env.MAIL_SERVICE,
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT as string, 10),
    secure: false,
    auth: {
      accessToken: accessToken,
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false,
    },
  };
  return createTransport(nodemailerConfigOptions);
};

export default createTransporter;
