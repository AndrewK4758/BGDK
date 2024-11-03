// import { spawn } from 'child_process';
import * as pty from 'node-pty';
import { Router, type Request, type Response } from 'express';
import { cwd } from 'process';
// import { dirname } from 'path';

const activePtyProcesses = new Map<string, pty.IPty>();

const pythonRouter: Router = Router();

pythonRouter.get('/query/:id', (req: Request, resp: Response) => {
  const { id } = req.params;

  const shell = 'nx';

  const pythonProcess = pty.spawn(
    shell, // Path to the Python interpreter in the virtual environment
    ['run', 'wdg-agents:start-poetry'],
    { cwd: `${cwd()}`, name: 'xterm-color', cols: 80, rows: 30, env: process.env },
  );

  // pythonProcess.on('error', err => {
  // console.error(err);
  // resp.send('I HAVE NO FUCKING IDEA WHY THIS WILL NOT STAY RUNNING - ERROR');
  // });

  let output = '';
  // let errorOutput = '';

  // pythonProcess.stderr.on('data', data => {
  // errorOutput += data.toString();
  //
  // console.log(errorOutput.toString(), 'stderr string error');
  // });

  pythonProcess.onData(data => {
    console.log(data.toString(), 'DATA');
    output += data.toString();
    console.log(output.toString(), 'OUTPUT');
    // resp.send(output.toString());
  });

  // pythonProcess.on('spawn', () => {
  //   pythonProcess.stdin.write('example PDFS\n');
  //   pythonProcess.stdin.end();
  // });
  // pythonProcess.on('close', code => {
  //   console.log(code, 'CODE');
  //   if (code === 0) resp.send(output);
  //   else resp.status(500).send('error executing python script');
  // });

  pythonProcess.write('example PDFS\r\n');

  // // pythonProcess.stdin.end();

  activePtyProcesses.set(id, pythonProcess);

  console.log(pythonProcess);
});

pythonRouter.get('/write/:id/:command', (req: Request, resp: Response) => {
  const { id, command } = req.params;

  const ptyProcess = activePtyProcesses.get(id);

  ptyProcess.write(`${command}\r\n`);

  ptyProcess.onData(data => {
    console.log(data, 'DATA');
    // resp.send(data);
  });

  console.log(ptyProcess);
});

export default pythonRouter;
