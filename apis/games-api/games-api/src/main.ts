import { SocketServer } from '@bgdk/socket-io';
import cors, { CorsOptions } from 'cors';
import express, { Express } from 'express';
import * as http from 'http';
import * as path from 'path';
import { ServerOptions } from 'socket.io';
import swaggerUi from 'swagger-ui-express';
import router, { GameRoutes } from './routes/routes';
import addGameToSocketInstance from './services/socket-io/socket-add-game-middleware';
import socketBoardAction from './services/socket-io/socket-board-action';
import specs from './services/swagger/swagger-setup';

/**
 * Add cleanup service to take games in users active_game col and compare last active to current minute and if
 * greater than some timeframe, remove the game from active_game array
 */

const app: Express = express();

export const corsOptions: CorsOptions = {
  origin: ['http://localhost:4200', 'http://localhost:3000', 'https://andrew-k.us'],
  methods: ['get', 'post', 'patch', 'put', 'delete', 'options', '*'],
  exposedHeaders: ['*'],
  optionsSuccessStatus: 204,
  allowedHeaders: ['*', 'content-type', 'content-length'],
  credentials: true,
};

const serverOptions: Partial<ServerOptions> = {
  cleanupEmptyChildNamespaces: true,
  cors: corsOptions,
};

const httpServer = http.createServer(app);

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.enable('trust proxy');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/api/v1', router);

export const socketServer = new SocketServer(
  httpServer,
  serverOptions,
  [addGameToSocketInstance],
  [['connection', socketBoardAction]],
);

new GameRoutes();

const port = parseInt(process.env.PORT) || 3000;

const server = httpServer.listen(port, () => {
  console.log(`Listening on ${port}/api/v1`);
});

server.on('error', console.error);

export default app;
