import { Text } from '@bgdk/react-components';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { type SxProps } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { lazy, useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { MediaRecorderClientContextProvider } from '../../contexts/audio-context';
import Theme from '../../styles/theme';
import handleScrollIntoView from '../../utils/handle-scroll-into-view';

const PromptBuilder = lazy(() => import('../../components/gen-ai/prompt-builder/prompt-builder'));

const title = 'Generative AI';

const body = `Below is a "prompt generator" to help take your idea and provide an interface to edit and format the text in a way to increase the probability of receiving the desired response from your desired generative-ai model. I use Google Gemini through Vertex API. The types of generation listed above can be used to test your prompt, and if you are happy with the result, please feel free to use and enjoy the portal.`;

const titleSx: SxProps = {
  width: 'fit-content',
  maxWidth: '80%',
  textAlign: 'center',
  flex: '1 0 100%',
};

const GenAiHome = () => {
  const divRef = useRef<HTMLElement>(null);
  const nav = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>('');

  useEffect(() => {
    if (divRef.current) handleScrollIntoView(divRef.current);
  }, []);

  return (
    <Box
      ref={divRef}
      component={'div'}
      key={'gen-ai-wrapper'}
      id="gen-ai-wrapper"
      sx={{
        flex: '0 1 100%',
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
        sx={{ width: '60vw' }}
      >
        <Box
          component={'section'}
          key={'gen-ai-title-wrapper'}
          id="gen-ai-title-wrapper"
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingY: 2 }}
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
              onClick={() => nav('text', { replace: true })}
            >
              Text
            </Button>
            <Button
              LinkComponent={'button'}
              key={'gen-ai-image'}
              id="gen-ai-image"
              sx={{ fontSize: '2rem', color: Theme.palette.text.secondary }}
              onClick={() => nav('image', { replace: true })}
            >
              Image
            </Button>
            <Button
              LinkComponent={'button'}
              key={'gen-ai-audio'}
              id="gen-ai-audio"
              sx={{ fontSize: '2rem', color: Theme.palette.text.secondary }}
              onClick={() => nav('audio')}
            >
              Audio
            </Button>
            <Button
              LinkComponent={'button'}
              key={'gen-ai-video'}
              id="gen-ai-video"
              sx={{ fontSize: '2rem', color: Theme.palette.text.secondary }}
              onClick={() => nav('video')}
            >
              Video
            </Button>
          </Toolbar>
        </AppBar>
        <Container sx={{ paddingY: 2 }}>
          <Box component={'div'} key={'gen-ai-header-text-wrapper'} id="gen-ai-header-text-wrapper">
            <Typography component={'p'} key={'gen-ai-header-text'} id="gen-ai-header-text" variant="body1">
              {body}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flex: '0 1 100%', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Button
              color="secondary"
              variant="text"
              onClick={() => setOpen(!open)}
              sx={{
                textAlign: 'right',
                color: Theme.palette.secondary.light,
                fontSize: '1.25rem',
              }}
            >
              {open ? 'Close' : 'Prompt Builder'}
            </Button>
          </Box>
        </Container>
      </Paper>
      <Box
        component={'section'}
        key={'prompt-builder-form-wrapper'}
        id="prompt-builder-form-wrapper"
        sx={{ width: '60vw' }}
      >
        <Container
          component={'div'}
          key={'prompt-builder-collapse-box'}
          id="prompt-builder-collapse-box"
          sx={{ width: '100%' }}
        >
          <Collapse appear={open} in={open} collapsedSize={0} component={'div'}>
            <PromptBuilder setPrompt={setPrompt} />
          </Collapse>
        </Container>
      </Box>
      <Box
        component={'div'}
        key={'gen-ai-outlet-wrapper'}
        id="gen-ai-outlet-wrapper"
        sx={{ height: 'fit-content', minHeight: '70vh', width: '60vw' }}
      >
        <MediaRecorderClientContextProvider>
          <Outlet context={{ prompt: prompt }} />
        </MediaRecorderClientContextProvider>
      </Box>
    </Box>
  );
};

export default GenAiHome;
