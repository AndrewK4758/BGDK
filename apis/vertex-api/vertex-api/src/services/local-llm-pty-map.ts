import type { ChildProcessWithoutNullStreams } from 'child_process';
// import { IPty } from 'node-pty';

const activePtyProcesses = new Map<string, ChildProcessWithoutNullStreams>();

export default activePtyProcesses;
