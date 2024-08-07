import cors, { CorsOptions } from 'cors';
import express from 'express';
import * as http from 'http';
import * as path from 'path';
import Routes from './routes/routes';

const app = express();
const router = express.Router();

export const corsOptions: CorsOptions = {
  origin: '*',
  methods: '*',
  exposedHeaders: '*',
  optionsSuccessStatus: 204,
  allowedHeaders: '*',
};

export const httpServer = http.createServer(app);

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.enable('trust proxy');
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/api/v1', router);

new Routes(router);

const port = process.env.PORT || 4444;


const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api/v1`);
});
server.on('error', console.error);

