import { AllGamesMap } from '@aklapper/all-games-map';
import { InstanceTimeMap, reaper } from '@aklapper/instance-time-map';
import cors, { CorsOptions } from 'cors';
import express from 'express';
import * as path from 'path';
import { GameRoutes } from './routes/game_routes';

const app = express();
const router = express.Router();

const corsOptions: CorsOptions = {
  origin: '*',
  methods: '*',
  exposedHeaders: '*',
  optionsSuccessStatus: 204,
  allowedHeaders: '*',
};

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
const server = app.listen(port, () => {
  console.log(`Listening at http://0.0.0.0:${port}/api/v1`);
});
server.on('error', console.error);
export default app;
