import cors, { CorsOptions } from 'cors';
import express, { Express } from 'express';
import * as path from 'path';
import router, { PortfolioRoutes } from './routes/routes';

const app: Express = express();

export const corsOptions: CorsOptions = {
  origin: ['http://localhost:4700', 'https://andrew-k.us'],
  methods: ['get', 'post', 'patch', 'put', 'delete', 'options', '*'],
  exposedHeaders: ['*'],
  optionsSuccessStatus: 204,
  allowedHeaders: ['*', 'content-type', 'content-length'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.enable('trust proxy');
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/api/v1', router);

new PortfolioRoutes();

const port = parseInt(process.env.PORT) || 4758;
const host = process.env.HOST || 'localhost';
const server = app.listen(port, () => {
  console.log(`Listening at http://${host}:${port}/api/v1`);
});
server.on('error', console.error);

export default app;
