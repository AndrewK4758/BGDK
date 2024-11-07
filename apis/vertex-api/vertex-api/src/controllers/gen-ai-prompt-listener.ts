// import type { SocketCallback } from '@bgdk/socket-io';
// import { type Socket } from 'socket.io';
// import activePtyProcesses from '../services/local-llm-pty-map';
// // import type { IPty } from 'node-pty';
// import type { ChildProcessWithoutNullStreams } from 'child_process';

// const listenForPromptInput: SocketCallback = (socket: Socket) => {
//   socket.on('modelQuery', ({ shellId, modelTextQuery }) => {
//     const pythonProcess = activePtyProcesses.get(shellId) as ChildProcessWithoutNullStreams;

//     console.log(shellId, 'Shell ID');
//     console.log(modelTextQuery, 'text query');

//     pythonProcess.stdin.write(`${modelTextQuery}\n`, a => {
//       console.log(a);
//     });
//   });
// };

// export default listenForPromptInput;
