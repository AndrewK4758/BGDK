import { SocketServer } from '@bgdk/socket-io';
import cors, { CorsOptions } from 'cors';
import express, { Express } from 'express';
import * as http from 'http';
import * as path from 'path';
import { cwd } from 'process';
import type { ServerOptions } from 'socket.io';
import { fileURLToPath } from 'url';
import handleTextDataChunks from './controllers/gen-ai-text-handler';
import connectWsToLocalModel from './controllers/start-agent';
import startPythonShell from './python/start-python-shell';
import router, { Routes } from './routes/routes';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app: Express = express();

export const pythonProcess = startPythonShell('poetry', ['run', 'python', 'agent_1.py'], {
  cwd: `${cwd()}/apps/wdg-agents/wdg_agents`,
  env: process.env,
  shell: true,
  stdio: 'pipe',
  detached: true,
});

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

export const socketServer = new SocketServer(httpServer, serverOptions, [handleTextDataChunks, connectWsToLocalModel]);

new Routes();

const port = process.env.PORT || 5000;

const server = httpServer.listen(port, () => {
  console.log(`Listening on ${port}/api/v1`);
});

server.on('error', console.error);

export default app;
