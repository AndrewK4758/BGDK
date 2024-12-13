// 'use server';
// import cors from 'cors';
// import express, { type Express, type NextFunction, type Request, type Response } from 'express';
// import { cwd } from 'process';
// import render from './src/main.server';
// import { extname } from 'path';

// const PORT = process.env['PORT'] ?? 4200;
// const app: Express = express();

// console.log(cwd(), 'CURRENT WORKING DIRECTORY');

// app.use(cors());

// // Logging middleware
// app.use((req: Request, _res: Response, next: NextFunction) => {
//   console.log(`Incoming request: ${req.method} ${req.url}`);
//   next();
// });

// app.use('/node_modules', express.static('/home/ak475826/Projects/BGDK'));
// app.use(
//   express.static(`${cwd()}/dist`, {
//     maxAge: '1y',
//     setHeaders: (resp, filePath) => {
//       if (extname(filePath) === '.mjs') {
//         resp.setHeader('Content-Type', 'application/javascript');
//       }
//     }
//   })
// );

// app.get('*', (req: Request, resp: Response, next: NextFunction) => {
//   if (req.url.includes('.')) {
//     return next();
//   }

//   render(req, resp);
// });

// const server = app.listen(PORT, () => {
//   console.log(`listening on localhost ${PORT}`);
// });

// server.on('error', console.error);
