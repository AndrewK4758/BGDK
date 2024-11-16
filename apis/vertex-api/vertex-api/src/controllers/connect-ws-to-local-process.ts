// import { Socket } from 'socket.io';
// import { pythonProcess } from '../main';

// const connectWsToLocalProcess = (socket: Socket) => {
//   console.log('sockets connected to local model');

//   if (pythonProcess) {
//     pythonProcess.on('spawn', () => {
//       console.log('spawned');
//     });

//     pythonProcess.stdout.on('data', data => {
//       socket.emit('promptResponse', data.toString());
//     });

//     pythonProcess.stderr.on('data', data => {
//       socket.emit('promptResponseError', data.toString());
//     });

//     socket.on('modelQuery', ({ modelTextQuery }) => {
//       pythonProcess.stdin.write(`${modelTextQuery}\n`);
//     });
//   }
// };

// export default connectWsToLocalProcess;
