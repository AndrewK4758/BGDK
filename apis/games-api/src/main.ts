import { AllGamesMap } from '@bgdk/all-games-map';
import cors, { CorsOptions } from 'cors';
import express from 'express';
import * as http from 'http';
import * as path from 'path';
import { InstanceTimeMap, reaper } from './instance-time-map/instance-time-map';
import { GameRoutes } from './routes/game_routes';
import SocketBuilder from './services/web-sockets/socket-io';

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

const instanceMap = new InstanceTimeMap();
const allGamesMap = new AllGamesMap();

app.set('instanceMap', instanceMap);
app.set('allGamesMap', allGamesMap);
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/api/v1', router);
app.enable('trust proxy');

new GameRoutes(router);

reaper(instanceMap);

const port = process.env.PORT || 3333;
const server = httpServer.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api/v1`);
});
server.on('error', console.error);
export default app;

const socket1 = SocketBuilder.BuildSocket(httpServer);

socket1.listenEvent('connection');

socket1.listenEvent('hello', (data) => {
  console.log(data);
});

socket1.listenEvent('hello back', (data) => {
  console.log(data);
});

socket1.emitEvent('hello back', 'hello from the server');
