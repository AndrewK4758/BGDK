import { SocketServer } from '@bgdk/socket-io-server';
import cors, { CorsOptions } from 'cors';
import express, { Express } from 'express';
import { createServer } from 'http';
import { join } from 'path';
import { cwd } from 'process';
import type { ServerOptions } from 'socket.io';
import handleTextDataChunks from './controllers/gen-ai-text-handler';
import connectWsToLocalProcess from './controllers/connect-ws-to-local-process';
import startPythonShell from './python/start-python-shell';
import router, { Routes } from './routes/routes';

const __dirname =
  process.env.NODE_ENV === 'production'
    ? `${cwd()}/apis/portfolio-api/portfolio-api/dist`
    : `${cwd()}/apis/portfolio-api/portfolio-api/src`;

const app: Express = express();

export const pythonProcess = startPythonShell('poetry', ['run', 'python', 'agent_1.py'], {
  cwd: `${cwd()}/apps/wdg-agents/wdg_agents`,
  env: process.env,
  shell: true,
  stdio: 'pipe',
  detached: true,
});

export const corsOptions: CorsOptions = {
  origin: 'http://localhost:4700',
  methods: ['get', 'post', 'patch', 'put', 'delete', 'options', 'download'],
  exposedHeaders: '*',
  optionsSuccessStatus: 204,
  allowedHeaders: '*',
  credentials: true,
};

export const httpServer = createServer(app);

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.enable('trust proxy');
app.use('/assets', express.static(join(__dirname, 'assets')));
app.use('/api/v1', router);

const serverOptions: Partial<ServerOptions> = {
  cleanupEmptyChildNamespaces: true,
  cors: corsOptions,
};

export const socketServer = new SocketServer(httpServer, serverOptions, [
  handleTextDataChunks,
  connectWsToLocalProcess,
]);

new Routes();

const port = process.env.PORT || 5000;

const server = httpServer.listen(port, () => {
  console.log(`Listening on ${port}/api/v1`);
});

server.on('error', console.error);

export default app;
