import type { SocketCallback } from '@bgdk/types-ai';
import { generateTextContent } from '@bgdk/vertex-ai';
import { type Socket } from 'socket.io';

const handleTextDataChunks: SocketCallback = (socket: Socket) => {
  socket.on('prompt', async prompt => {
    const { stream } = await generateTextContent(prompt);

    for await (const chunk of stream) {
      if (chunk.candidates) {
        if (chunk.candidates[0].content.parts[0].text) {
          const textData = chunk.candidates[0].content.parts[0].text;
          socket.emit('chunk', { response: textData });
        }
      }
    }
  });
};

export default handleTextDataChunks;
