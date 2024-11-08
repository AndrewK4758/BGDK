import type { SocketCallback } from '@bgdk/socket-io';
import { type Socket } from 'socket.io';
import { generateTextContent } from '@bgdk/vertex-ai';

const handleTextDataChunks: SocketCallback = (socket: Socket) => {
  socket.on('text', async prompt => {
    console.log(prompt);

    const { stream } = await generateTextContent(prompt);

    for await (const chunk of stream) {
      if (chunk.candidates) {
        const textData = chunk.candidates[0].content.parts[0].text;
        socket.emit('chunk', { response: textData });
      }
    }
  });
};

export default handleTextDataChunks;
