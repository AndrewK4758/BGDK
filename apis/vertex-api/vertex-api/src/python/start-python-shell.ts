import { spawn, type SpawnOptions } from 'child_process';

const startPythonShell = (command: string, args: string[], options?: SpawnOptions) => {
  try {
    return spawn(command, args, options);
  } catch (error) {
    console.error(error);
    return null;
  }
};
export default startPythonShell;
