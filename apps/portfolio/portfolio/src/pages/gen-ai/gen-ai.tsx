import { ChatResponse, Text } from '@bgdk/react-components';
import { renderPreTagInsideParentDiv, Waiting } from '@bgdk/shared-react-components';
import type { PromptRequest } from '@bgdk/vertex-ai';
import { Modal } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { type SxProps } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { lazy, useRef, useState, type CSSProperties, type Dispatch, type SetStateAction } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { MediaRecorderClientContextProvider } from '../../contexts/audio-context';
import useScrollIntoView from '../../hooks/use-scroll-into-view';
import Theme from '../../styles/theme';

const PromptBuilder = lazy(() => import('../../components/gen-ai/prompt-builder/prompt-builder'));

export type OutletContextProps = {
  prompt: PromptRequest;
  promptResponse: string[];
  loading: boolean;
  setPromptResponse: Dispatch<SetStateAction<string[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const title = 'Generative AI';

const body = `Below is a "prompt generator" to help take your idea and provide an interface to edit and format the text in a way to increase the probability of receiving the desired response from your desired generative-ai model. I use Google Gemini through Vertex API. The types of generation listed above can be used to test your prompt, and if you are happy with the result, please feel free to use and enjoy the portal. In order to add or take away emphasis on a certain word or phrase, use + or minus with no spaces for the word. Such as: 'Make me a picture of a red++ sun,' this adds emphasis (or weight) to the part that is more, or most, important. You can add as many + or - as you would like to signify more or less weight.`;

const titleSx: SxProps = {
  width: 'fit-content',
  maxWidth: '80%',
  textAlign: 'center',
  flex: '1 0 100%',
};

const promptInit: PromptRequest = { text: '', fileData: null };

const GenAiHome = () => {
  const [prompt, setPrompt] = useState<PromptRequest>(promptInit);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [promptResponse, setPromptResponse] = useState<string[]>([]);
  const divRef = useRef<HTMLElement>(null);
  const nav = useNavigate();

  useScrollIntoView(divRef);

  return (
    <Box
      ref={divRef}
      component={'div'}
      key={'gen-ai-wrapper'}
      id="gen-ai-wrapper"
      sx={{
        flex: '1 0 100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '15vh',
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
      {open && (
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
              <PromptBuilder loading={loading} setLoading={setLoading} setPrompt={setPrompt} />
            </Collapse>
          </Container>
        </Box>
      )}
      <MediaRecorderClientContextProvider>
        <Box
          component={'div'}
          key={'gen-ai-outlet-wrapper'}
          id="gen-ai-outlet-wrapper"
          sx={{ height: 'fit-content', width: '60vw' }}
        >
          <Outlet context={{ prompt, promptResponse, loading, setPromptResponse, setLoading }} />
        </Box>
      </MediaRecorderClientContextProvider>

      <Modal
        open={loading}
        component={'div'}
        key={'gen-ai-response-loading-wrapper'}
        id="gen-ai-response-loading-wrapper"
        sx={{
          height: '100vh',
          width: '100vw',
          position: 'fixed',
          top: '50%',
          left: 0,
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <Box
          component={'div'}
          key={'gen-ai-response-loading-wrapper'}
          id="gen-ai-response-loading-wrapper"
          sx={{ height: '40%', maxHeight: '350px', flex: '0 1 40%' }}
        >
          <Waiting />
        </Box>
      </Modal>

      {promptResponse.length ? (
        <Box
          component={'div'}
          key={'gen-ai-response-wrapper'}
          id="gen-ai-response-wrapper"
          sx={{ height: 'fit-content', width: '60vw' }}
        >
          <Paper
            component={'div'}
            key={'gen-ai-response-paper'}
            id="gen-ai-response-paper"
            sx={{ height: '100%', width: '100%' }}
          >
            <Container
              component={'div'}
              key={'gen-ai-response-container'}
              id="gen-ai-response-container"
              sx={{ height: '100%', width: '100%' }}
            >
              <ChatResponse
                response={promptResponse}
                setLoading={setLoading}
                setPromptResponse={setPromptResponse}
                chatResponseLabelProps={{ textAlign: 'center', color: Theme.palette.secondary.light }}
                chatResponseTextProps={renderPreTagInsideParentDiv as CSSProperties}
              />
            </Container>
          </Paper>
        </Box>
      ) : null}
    </Box>
  );
};

export default GenAiHome;
