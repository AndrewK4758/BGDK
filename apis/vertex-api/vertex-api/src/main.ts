import cors, { CorsOptions } from 'cors';
import express, { Express } from 'express';
import * as http from 'http';
import * as path from 'path';
import VertexApiRoutes from './routes/routes.ts';
import { fileURLToPath } from 'url';

// FOR ESM MODULE BUILD
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// FOR ESM MODULE BUILD

const app: Express = express();
const router = express.Router();

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

new VertexApiRoutes(router);

const port = process.env.PORT || 5000;

const server = httpServer.listen(port, () => {
  console.log(`Listening on ${port}/api/v1`);
});

server.on('error', console.error);

export default app;
