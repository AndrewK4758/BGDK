import cors, { CorsOptions } from 'cors';
import express, { Express } from 'express';
import * as path from 'path';
import router, { PortfolioRoutes } from './routes/routes.ts';
// import cca, { tryCalls } from './services/masl';

// tryCalls().then(resp => {
//   const params = new URL(resp);

//   console.log(params);
//   console.log('\n');
//   console.log(resp);
//   const tokenRequest = {
//     code: '0.AW8B8dDwQ88jSUeNqjr21UMIXjcw0eIk5OpCkjTJ04pl0PnPACw.AgABBAIAAADW6jl31mB3T7ugrWTT8pFeAwDs_wUA9P_mKfHIftB6953EDUkYEYCPjQeun-DAFQ4pcZbmSsc3MyuSDukCCU2oFjdMVoLG3J-mAzmQau-jetmCbTgsMMaAyaM2vfyMssI066ru-6bO-BURquZVzTR4nHqfRLf6O54kEp-9jyu84O_lQbYuw4q9yACMPAhMiQELK5zsr7CJLMPusu4ojAh4ORPos5SzlB3PRWLI1rq9fR0DDtMFLjUIE4UujDmZAKxt6hH26rxPMSUaF5ZLbYTrw67Hcf4RcuvhwvRfbx5pMOV3t34WRtxdRmyHQHMIcREuCGD2w-mO7DnA_0ARGepIRWqWpm0PPd-URf1QowPAnyjYVP00c0w4_IVP5KSd9QWPFspQjmdiYsjp4yHa--J6NZFUzSyrtLg6B4-IiAZHLRL8aupTvbEoe8Nmha0w0sQB9m5edIR6JzF4KG84yN_yQoZVGjchbI8t8FiwdUE8FVjBovUxb9J1yp5pAYJ54lcd7sckBkwFIMXKiLvv9aUfp3N1fgh_VMWqtEPG2zFsJ-DtQHqz_L5RDRrgMuaP8Jxq7hiajUIpf6sN18Mxl-oWAY1s4iJQK2WXXbEgw2P6QuZLgYR25KI7Z46Hpx474IPvbTYaHhd6iD0tjc8UchYYqK3KPvk2wVUxcMMOY1NwFuYm8U5X3N_Q7w3qNl8bTZPRboygniKPCaPx-8_Iz2w0WruypH8wTJXsNJcAaLO2Yh9aq8yuloLakY_CupXKdFwi-MqKDfYERcwJ65e_7eQhYXweWic8DKw4lVwKlgc6UA7BPHeOGKXYL1ZsSft08pU3_0numw9_JZjHOzdjSg-Bc7niwWtBVPa68SxGIrIpRkjVDscw-In8-Ok6pWL-biULsnGp4M94-5E-OiuvxtMHFDtH7Omm_grTrxmgHG78JAe6-93joAsb4APhhTx48-gbC0FimdXz1mi1gkwmkwVFLsDxcpPm3nLMKxgbPrwIs6ufvTwk6TudsquKwIy8vohuaALtmznyvMBmiovToI2i4_ZSphHTxlpkX7A-',
//     scopes: ['mail.send'],
//     redirectUri: process.env.MAIL_REDIRECT_URI,
//   };
//   cca.acquireTokenByCode(tokenRequest).then(resp => console.log(resp));
// });

const app: Express = express();

export const corsOptions: CorsOptions = {
  origin: ['http://localhost:4700', 'https://andrew-k.us', 'http://localhost:4758'],
  methods: ['get', 'post', 'patch', 'put', 'delete', 'options', '*'],
  exposedHeaders: ['*'],
  optionsSuccessStatus: 204,
  allowedHeaders: ['*', 'content-type', 'content-length'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.enable('trust proxy');
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/api/v1', router);

new PortfolioRoutes();

const port = parseInt(process.env.PORT as string) || 4758;
const host = process.env.HOST || 'localhost';
const server = app.listen(port, () => {
  console.log(`Listening at http://${host}:${port}/api/v1`);
});
server.on('error', console.error);

export default app;
