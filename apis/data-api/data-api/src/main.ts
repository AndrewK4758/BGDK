import cors, { CorsOptions } from 'cors';
import express, { Express } from 'express';
import { createServer } from 'http';
import { join } from 'path';
import Routes, { router } from './routes/routes';
import { cwd } from 'process';

const __dirname =
  process.env.NODE_ENV === 'production'
    ? `${cwd()}/apis/data-api/data-api/dist`
    : `${cwd()}/apis/data-api/data-api/src`;

const app: Express = express();

export const corsOptions: CorsOptions = {
  origin: '*',
  methods: '*',
  exposedHeaders: '*',
  optionsSuccessStatus: 204,
  allowedHeaders: '*',
  credentials: false,
};

export const httpServer = createServer(app);

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.enable('trust proxy');
app.use('/assets', express.static(join(__dirname, 'assets')));
app.use('/api/v1', router);

new Routes();

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api/v1`);
});
server.on('error', console.error);
