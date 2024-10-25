import cors, { CorsOptions } from 'cors';
import express, { Express } from 'express';
import * as http from 'http';
import * as path from 'path';
import { SocketServer } from '@bgdk/socket-io';
import type { ServerOptions } from 'socket.io';
import handleTextDataChunks from './controllers/gen-ai-text-handler';
import router, { Routes } from './routes/routes';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app: Express = express();

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

const serverOptions: Partial<ServerOptions> = {
  cleanupEmptyChildNamespaces: true,
  cors: corsOptions,
};

new SocketServer(httpServer, serverOptions, [], [['connection', handleTextDataChunks]]);

new Routes();

const port = process.env.PORT || 5000;

const server = httpServer.listen(port, () => {
  console.log(`Listening on ${port}/api/v1`);
});

server.on('error', console.error);

export default app;
