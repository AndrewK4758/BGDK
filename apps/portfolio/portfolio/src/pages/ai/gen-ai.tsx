import { Text } from '@bgdk/react-components';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { type SxProps } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useEffect, useRef } from 'react';
import { Outlet, useNavigate, type NavigateFunction } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import Theme from '../../styles/theme';
import handleScrollIntoView from '../../utils/handle-scroll-into-view';
import ClientSocket from '../../utils/web-socket/socket-instance';
import PromptBuilder from '../../components/gen-ai/prompt-builder';

const title = 'Generative AI';

const body = `Below is a "prompt generator" to help take your idea and provide an interface to edit and format the text in a way to increase the probability of receiving the desired response from your desired generative-ai model. I use Google Gemini through Vertex API. The types of generation listed above can be used to test your prompt, and if you are happy with the result, please feel free to use and enjoy the portal.`;

const titleSx: SxProps = {
  width: 'fit-content',
  maxWidth: '80%',
  textAlign: 'center',
  flex: '1 0 100%',
};

const GenAiHome = () => {
  const clientSocket = new ClientSocket(import.meta.env.VITE_WS_SERVER_URL_VERTEX, { autoConnect: false });
  const socketRef = useRef<Socket>(clientSocket.Socket);
  const divRef = useRef<HTMLElement>(null);
  const nav = useNavigate();
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
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <Box
      ref={divRef}
      component={'div'}
      key={'gen-ai-wrapper'}
      id="gen-ai-wrapper"
      sx={{
        flex: '1 0 100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '10vh',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={24}
        component={'div'}
        key={'gen-ai-header-wrapper'}
        id="gen-ai-header-wrapper"
        sx={{ width: '55%' }}
      >
        <Box
          component={'section'}
          key={'gen-ai-title-wrapper'}
          id="gen-ai-title-wrapper"
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Text titleVariant="h3" titleText={title} sx={titleSx} />
        </Box>
        <AppBar
          component={'div'}
          id="gen-ai-navbar-wrapper"
          key={'gen-ai-navbar-wrapper'}
          elevation={24}
          position="static"
        >
          <Toolbar
            component={'nav'}
            id="gen-ai-navbar"
            key={'gen-ai-navbar'}
            sx={{ display: 'flex', justifyContent: 'space-evenly', flex: '1 0 100%' }}
          >
            <Button
              LinkComponent={'button'}
              key={'gen-ai-text'}
              id="gen-ai-text"
              sx={{ fontSize: '2rem', color: Theme.palette.text.secondary }}
              onClick={e => handleFormatSelect(e.currentTarget.textContent as string, nav)}
            >
              Text
            </Button>
            <Button
              LinkComponent={'button'}
              key={'gen-ai-image'}
              id="gen-ai-image"
              sx={{ fontSize: '2rem', color: Theme.palette.text.secondary }}
              onClick={e => handleFormatSelect(e.currentTarget.textContent as string, nav)}
            >
              Image
            </Button>
            <Button
              LinkComponent={'button'}
              key={'gen-ai-audio'}
              id="gen-ai-audio"
              sx={{ fontSize: '2rem', color: Theme.palette.text.secondary }}
              onClick={e => handleFormatSelect(e.currentTarget.textContent as string, nav)}
            >
              Audio
            </Button>
            <Button
              LinkComponent={'button'}
              key={'gen-ai-video'}
              id="gen-ai-video"
              sx={{ fontSize: '2rem', color: Theme.palette.text.secondary }}
              onClick={e => handleFormatSelect(e.currentTarget.textContent as string, nav)}
            >
              Video
            </Button>
            <Button
              LinkComponent={'button'}
              key={'gen-ai-multimodal'}
              id="gen-ai-multimodal"
              sx={{ fontSize: '2rem', color: Theme.palette.text.secondary }}
              onClick={e => handleFormatSelect(e.currentTarget.textContent as string, nav)}
            >
              Multi-Modal
            </Button>
          </Toolbar>
        </AppBar>
        <Box component={'div'} key={'gen-ai-header-text-wrapper'} id="gen-ai-header-text-wrapper" sx={{ p: 2 }}>
          <Typography
            component={'p'}
            key={'game-header-text'}
            id="game-header-text"
            variant="body1"
            sx={{ paddingLeft: 1 }}
          >
            {body}
          </Typography>
        </Box>
      </Paper>
      <Box
        component={'section'}
        key={'prompt-builder-wrapper'}
        id="prompt-builder-wrapper"
        sx={{ height: 'fit-content', minHeight: '30vh', width: '65%' }}
      >
        <PromptBuilder />
      </Box>
      <Box
        component={'div'}
        key={'gen-ai-outlet-wrapper'}
        id="gen-ai-outlet-wrapper"
        sx={{ height: 'fit-content', minHeight: '30vh' }}
      >
        <Outlet context={{ socket: socket }} />
      </Box>
    </Box>
  );
};

export default GenAiHome;

const handleFormatSelect = (mode: string, nav: NavigateFunction) => {
  nav(mode);
};
