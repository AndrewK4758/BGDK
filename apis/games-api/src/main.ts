import { AllGamesMap, InstanceMap, reaper } from '@aklapper/model';
import cors from 'cors';
import express from 'express';
import * as path from 'path';
import { GameRoutes } from './routes/game_routes';

const app = express();
const router = express.Router();

const corsOptions = {
  origin: '*',
  optionSuccessStatus: '*',
  exposedHeaders: '*',
};

app.set('instanceMap', new InstanceMap());
app.set('allGamesMap', new AllGamesMap());
app.use(cors(corsOptions));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/api/v1', router);

new GameRoutes(router);

const instanceMap = app.get('instanceMap');
reaper(instanceMap);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://0.0.0.0:${port}/api/v1`);
});
server.on('error', console.error);
export default app;
