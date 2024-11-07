// import { type Request, type Response } from 'express';
// import startPythonShell from '../python/start-python-shell';

// const spawnPythonShell = async (_req: Request, resp: Response) => {
//   try {
//     const shellId = startPythonShell();

//     resp.setHeader('shell-id', shellId);

//     resp.sendStatus(201);
//   } catch (error) {
//     console.error(error);
//     resp.status(500).send('Failed to load shell. Please reload page and try again');
//   }
// };

// export default spawnPythonShell;
