import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import handleScrollIntoView from '../../utils/handle-scroll-into-view';
import Theme from '../../styles/theme';
import ClientSocket from '../../utils/web-socket/socket-instance';
import { Socket } from 'socket.io-client';

const GenAiHome = () => {
  const clientSocket = new ClientSocket(import.meta.env.VITE_WS_SERVER_URL_VERTEX, { autoConnect: false });
  const [textResponse, setTextResponse] = useState<string>('');
  const socketRef = useRef<Socket>(clientSocket.Socket);
  const divRef = useRef<HTMLDivElement>();
  const socket = socketRef.current;

  useEffect(() => {
    if (divRef.current) handleScrollIntoView(divRef.current);
    if (!socket.connected) {
      socket.connect();
      socket.on('connect', () => {
        console.log(`Connected on id: ${socket.id}`);
      });
    }
    socket.on('chunk', chunk => {
      const { response } = chunk;
      console.log(response);
      setTextResponse(prev => (prev += response));
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <Box
      ref={divRef}
      sx={{
        display: 'flex',
        flex: '1 0 100%',
        justifyContent: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        justifySelf: 'center',
      }}
    >
      <Button
        onClick={() => {
          setTextResponse('');
          socket.emit('text', 'tell me a 500 word story');
        }}
        sx={{ fontSize: '10rem', width: '100%' }}
      >
        CLICK
      </Button>
      <Typography color="textPrimary" fontSize={'2rem'} width={'80%'} bgcolor={Theme.palette.background.paper}>
        {textResponse}
      </Typography>
    </Box>
  );
};

export default GenAiHome;
