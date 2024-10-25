import { Configuration, LogLevel, ConfidentialClientApplication } from '@azure/msal-node';
import { configDotenv } from 'dotenv';
import { cwd } from 'process';

configDotenv({ path: `${cwd()}/apis/portfolio/portfolio-api/env/.env` });

const config: Configuration = {
  auth: {
    clientId: process.env.MAIL_SECRET_ID as string,
    clientSecret: process.env.MAIL_SECRET_VALUE,
    authority: (process.env.MAIL_CLOUD_INSTANCE as string) + process.env.MAIL_TENANT_ID,
  },
  system: {
    loggerOptions: {
      loggerCallback(_loglevel, message) {
        console.log(message);
      },
      piiLoggingEnabled: true,
      logLevel: LogLevel.Trace,
    },
  },
};

const cca = new ConfidentialClientApplication(config);

// export const genPKceCodes = async () => {
//   const crypto = new CryptoProvider();
//   const codes = await crypto.generatePkceCodes();
//   codes;
//   return {
//     challenge: codes.challenge,
//     verifier: codes.verifier,
//   };
// };
// export const codeChallenge = await new MASL.CryptoProvider().generatePkceCodes();

export default cca;
