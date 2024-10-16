import cors, { CorsOptions } from 'cors';
import express, { Express } from 'express';
import * as http from 'http';
import * as path from 'path';
import Routes, { router } from './routes/routes.js';
import { fileURLToPath } from 'url';

// FOR ESM MODULE BUILD
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// FOR ESM MODULE BUILD

const app: Express = express();

export const corsOptions: CorsOptions = {
  origin: '*',
  methods: '*',
  exposedHeaders: '*',
  optionsSuccessStatus: 204,
  allowedHeaders: '*',
};

export const httpServer = http.createServer(app);

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.enable('trust proxy');
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/api/v1', router);

new Routes();

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api/v1`);
});
server.on('error', console.error);
