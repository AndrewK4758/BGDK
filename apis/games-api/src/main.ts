import { AllGamesMap } from '@bgdk/all-games-map';
import cors, { CorsOptions } from 'cors';
import express from 'express';
import * as http from 'http';
import * as path from 'path';
import { Server } from 'socket.io';
import { GameRoutes } from './routes/game_routes';
import {
  InstanceTimeMap,
  reaper,
} from './services/instance-time-map/instance-time-map';
import performActionWs from './controllers/perform_action_web_socket_context';
// import { GamePlayerValidation } from '@bgdk/game-types';

const app = express();
const router = express.Router();

export const corsOptions: CorsOptions = {
  origin: '*',
  methods: '*',
  exposedHeaders: '*',
  optionsSuccessStatus: 204,
  allowedHeaders: '*',
};

const instanceMap = new InstanceTimeMap();
const allGamesMap = new AllGamesMap();

export const httpServer = http.createServer(app);
export const io = new Server(httpServer, {
  cleanupEmptyChildNamespaces: true,
  cors: corsOptions,
  transports: ['websocket', 'polling'],
});

app.set('instanceMap', instanceMap);
app.set('allGamesMap', allGamesMap);
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/api/v1', router);
app.enable('trust proxy');

new GameRoutes(router);

reaper(instanceMap);

io.on('connection', async (socket) => {
  const room = socket.handshake.query.gameInstanceID as string;
  socket.join(room);
  performActionWs(io, room);
});

const port = process.env.PORT || 3333;
const server = httpServer.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api/v1`);
});

server.on('error', console.error);
export { app };