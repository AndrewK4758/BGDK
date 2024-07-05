import { getActiveGameWS } from '@bgdk/de-referencing-utilities';
import { GameInstanceID } from '@bgdk/types-game';
import { IInstanceOfGame } from '@bgdk/instance-of-game';
import cors, { CorsOptions } from 'cors';
import express from 'express';
import * as http from 'http';
import * as path from 'path';
import { Server } from 'socket.io';
import useAllGamesMap, { allGamesMap } from './controllers/middleware/all-games-map';
import useInstanceTimeMap from './controllers/middleware/instance-map';
import performActionWs from './controllers/perform_action_web_socket_context';
import GameRoutes from './routes/game_routes';

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
export const io = new Server(httpServer, {
  cleanupEmptyChildNamespaces: true,
  cors: corsOptions,
});

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.enable('trust proxy');
app.use(useInstanceTimeMap);
app.use(useAllGamesMap);
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/api/v1', router);

new GameRoutes(router);

io.on('connection', socket => {
  socket.on('create-room', gameInstanceID => {
    const room = gameInstanceID as GameInstanceID;
    console.log(`in room: ${room}`);
    socket.join(room);
    const game = getActiveGameWS(room, allGamesMap);
    socket.data = game;
  });

  socket.on('action', data => {
    const game: IInstanceOfGame = socket.data;
    performActionWs(io, game, data.action);
  });
});

const port = process.env.PORT || 3333;
const server = httpServer.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api/v1`);
});

server.on('error', console.error);
export default app;
