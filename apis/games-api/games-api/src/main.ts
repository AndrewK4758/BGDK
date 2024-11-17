import { SocketServer } from '@bgdk/socket-io-server';
import cors, { CorsOptions } from 'cors';
import express, { Express } from 'express';
import { createServer } from 'http';
import { join } from 'path';
import { ServerOptions } from 'socket.io';
import socketBoardAction from './events/socket-board-action';
import addGameToSocketInstance from './middleware/socket-add-game-middleware';
import router, { GameRoutes } from './routes/routes';
import { cwd } from 'process';

const __dirname =
  process.env.NODE_ENV === 'production'
    ? `${cwd()}/apis/games-api/games-api/dist`
    : `${cwd()}/apis/games-api/games-api/src`;

/**
 * Add cleanup service to take games in users active_game col and compare last active to current minute and if
 * greater than some timeframe, remove the game from active_game array
 */

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
  ],
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
  exposedHeaders: ['current-game'],
  optionsSuccessStatus: 204,
  allowedHeaders: ['*', 'content-type', 'content-length', 'current-game'],
  credentials: false,
};

const serverOptions: Partial<ServerOptions> = {
  cleanupEmptyChildNamespaces: true,
  cors: corsOptions,
};

const httpServer = createServer(app);

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.enable('trust proxy');
app.use('/assets', express.static(join(__dirname, 'assets')));
app.use('/api/v1', router);

export const socketServer = new SocketServer(httpServer, serverOptions, [socketBoardAction], [addGameToSocketInstance]);

new GameRoutes();

const port = parseInt(process.env.PORT as string) || 3000;
const host = process.env.HOST || 'localhost';
const server = httpServer.listen(port, () => {
  console.log(`Listening on http://${host}:${port}/api/v1`);
});

server.on('error', console.error);

export default app;
