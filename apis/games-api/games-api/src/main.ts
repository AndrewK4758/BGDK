import cors, { CorsOptions } from 'cors';
import express from 'express';
import * as http from 'http';
import * as path from 'path';
import swaggerUi from 'swagger-ui-express';
import useAllGamesMap from './controllers/middleware/all-games-map';
import useInstanceTimeMap from './controllers/middleware/instance-map';
import GameRoutes from './routes/game_routes';
import SocketServer from './services/socket-io/socket-server';
import specs from './services/swagger/swagger-setup';

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

new SocketServer(httpServer);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.enable('trust proxy');
app.use(useInstanceTimeMap);
app.use(useAllGamesMap);
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/api/v1', router);

new GameRoutes(router);

const port = process.env.PORT || 3333;
const server = httpServer.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api/v1`);
});

server.on('error', console.error);

export default app;