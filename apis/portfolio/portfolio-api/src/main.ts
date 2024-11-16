import cors, { CorsOptions } from 'cors';
import express, { Express } from 'express';
import { join } from 'path';
import router, { PortfolioRoutes } from './routes/routes';
import { cwd } from 'process';

const __dirname =
  process.env.NODE_ENV === 'production'
    ? `${cwd()}/apis/portfolio-api/portfolio-api/dist`
    : `${cwd()}/apis/portfolio-api/portfolio-api/src`;

const app: Express = express();

export const corsOptions: CorsOptions = {
  origin: [
    'http://localhost:4700',
    'http://localhost:4200',
    'http://localhost:3000',
    'https://www.andrew-k.us',
    'https://andrew-k.us',
    'https://games-424800.uc.r.appspot.com/',
    'https://www.games-424800.uc.r.appspot.com/',
    '*',
  ],
  methods: ['get', 'post', 'patch', 'put', 'delete', 'options', '*'],
  exposedHeaders: ['*'],
  optionsSuccessStatus: 204,
  allowedHeaders: ['*', 'content-type', 'content-length'],
  credentials: true,
};

app.use('*', cors(corsOptions));
app.options('*', cors(corsOptions));
app.enable('trust proxy');
app.use('/assets', express.static(join(__dirname, 'assets')));
app.use('/api/v1', router);

new PortfolioRoutes();

const port = parseInt(process.env.PORT as string) || 4758;
const host = process.env.HOST || 'localhost';
const server = app.listen(port, () => {
  console.log(`Listening at http://${host}:${port}/api/v1`);
});
server.on('error', console.error);

export default app;
