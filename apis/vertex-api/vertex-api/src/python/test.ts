import type { ChildProcessWithoutNullStreams } from 'child_process';
import type { Socket } from 'socket.io';

const listenerWrapper = (pythonProcess: ChildProcessWithoutNullStreams, socket: Socket) => {
  pythonProcess.stdout.on('data', data => {
    console.log(data.toString(), 'STDOUT DATA OUTPUT');
    socket.emit('promptResponse', data.toString());
  });
};

export default listenerWrapper;
