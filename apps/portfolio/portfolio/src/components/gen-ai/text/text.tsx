import { Box } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { Socket } from 'socket.io-client';

const TextGenerator = () => {
  const { socket } = useOutletContext() as { socket: Socket };
  console.log(socket);
  return <Box>{'TEXT'}</Box>;
};

export default TextGenerator;
