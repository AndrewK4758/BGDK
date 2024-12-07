import { PromptResponse } from '@bgdk/react-components';
import { renderPreTagInsideParentDiv, Text, Waiting } from '@bgdk/shared-react-components';
import type { PromptRequest } from '@bgdk/vertex-ai';
import { Modal } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type Dispatch,
  type JSX,
  type SetStateAction,
} from 'react';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import suspenseImg from '../../assets/swirly-dots-to-chrome.webp';
import { MediaRecorderClientContextProvider } from '../../contexts/audio-context';
import useScrollIntoView from '../../hooks/use-scroll-into-view';
import loadContextPath from '../../services/loaders/gen-ai/load-context-path';
import {
  fullPageModalStyles,
  fullSizeBlock,
  headerModalButtonStyles,
  modalButtonBoxStyles,
  pagesButtonStyles,
  pagesOutletStyles,
  pagesTitlesBoxStyles,
  pagesTitleSx,
  pagesToolbarStyles,
  pagesWrapperStyles,
} from '../../styles/pages-styles';
import Theme from '../../styles/theme';
import { body, title } from '../static/gen-ai-text';

const PromptBuilder = lazy(() => import('../../components/gen-ai/prompt-builder/prompt-builder'));

export type OutletContextProps = {
  prompt: PromptRequest;
  promptResponse: string[];
  setPromptResponse: Dispatch<SetStateAction<string[]>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export type LayoutOutletContextProps = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const promptInit: PromptRequest = { text: '', fileData: null };

/**
 * This component renders the home page for the generative AI section of the application.
 * It provides an interface for users to interact with the AI model, including building prompts and viewing responses.
 *
 * @returns {JSX.Element} The rendered GenAiHome component.
 */

const GenAiHome = (): JSX.Element => {
  const { loading, setLoading } = useOutletContext<LayoutOutletContextProps>();
  const [prompt, setPrompt] = useState<PromptRequest>(promptInit);
  const [open, setOpen] = useState<boolean>(false);
  const [promptResponse, setPromptResponse] = useState<string[]>([]);
  const divRef = useRef<HTMLElement>(null);
  const nav = useNavigate();

  useScrollIntoView(divRef);

  useEffect(() => {
    loadContextPath();
  }, []);

  return (
    <Box
      onLoad={() => setLoading(false)}
      ref={divRef}
      component={'div'}
      key={'gen-ai-wrapper'}
      id="gen-ai-wrapper"
      sx={pagesWrapperStyles}
    >
      <Paper
        elevation={24}
        component={'div'}
        key={'gen-ai-header-wrapper'}
        id="gen-ai-header-wrapper"
        sx={{ width: '60vw' }}
      >
        <Box component={'section'} key={'gen-ai-title-wrapper'} id="gen-ai-title-wrapper" sx={pagesTitlesBoxStyles}>
          <Text component={'h3'} titleVariant="h3" titleText={title} sx={pagesTitleSx} />
        </Box>
        <AppBar
          component={'div'}
          id="gen-ai-navbar-wrapper"
          key={'gen-ai-navbar-wrapper'}
          elevation={24}
          position="static"
        >
          <Toolbar component={'nav'} id="gen-ai-navbar" key={'gen-ai-navbar'} sx={pagesToolbarStyles}>
            <Button
              LinkComponent={'button'}
              key={'gen-ai-text-button'}
              id="gen-ai-text-button"
              sx={pagesButtonStyles}
              onClick={() => nav('text', { replace: true })}
            >
              Text
            </Button>
            <Button
              LinkComponent={'button'}
              key={'gen-ai-image'}
              id="gen-ai-image"
              sx={pagesButtonStyles}
              onClick={() => nav('image', { replace: true })}
            >
              Image
            </Button>
            <Button
              LinkComponent={'button'}
              key={'gen-ai-audio'}
              id="gen-ai-audio"
              sx={pagesButtonStyles}
              onClick={() => nav('audio', { replace: true })}
            >
              Audio
            </Button>
          </Toolbar>
        </AppBar>
        <Container sx={{ paddingY: 2 }}>
          <Box component={'div'} key={'gen-ai-header-text-wrapper'} id="gen-ai-header-text-wrapper">
            <Text
              component={'p'}
              key={'gen-ai-header-text'}
              id="gen-ai-header-text"
              titleVariant="body1"
              titleText={body}
            />
          </Box>
          <Box key={'prompt-builder-wrapper'} id={'prompt-builder-wrapper'} sx={modalButtonBoxStyles}>
            <Button
              key={'prompt-builder-button'}
              id={'prompt-builder-button'}
              color="secondary"
              variant="text"
              onClick={() => setOpen(!open)}
              sx={headerModalButtonStyles}
            >
              {open ? 'Close' : 'Prompt Builder'}
            </Button>
          </Box>
        </Container>
      </Paper>
      {open && (
        <Box component={'section'} key={'prompt-builder-form-wrapper'} id="prompt-builder-form-wrapper" width={'75vw'}>
          <Container component={'div'} key={'prompt-builder-collapse-box'} id="prompt-builder-collapse-box">
            <Suspense fallback={<Waiting src={suspenseImg} />}>
              <Collapse appear={open} in={open} collapsedSize={0} component={'div'}>
                <PromptBuilder loading={loading} setLoading={setLoading} setPrompt={setPrompt} />
              </Collapse>
            </Suspense>
          </Container>
        </Box>
      )}

      <MediaRecorderClientContextProvider>
        <Box component={'div'} key={'gen-ai-outlet-wrapper'} id="gen-ai-outlet-wrapper" sx={pagesOutletStyles}>
          <Outlet context={{ prompt, promptResponse, loading, setPromptResponse, setLoading }} />
        </Box>
      </MediaRecorderClientContextProvider>

      <Modal
        open={loading}
        component={'div'}
        key={'gen-ai-response-loading-wrapper'}
        id="gen-ai-response-loading-wrapper"
        sx={fullPageModalStyles}
      >
        <Box
          component={'div'}
          key={'gen-ai-response-loading-wrapper'}
          id="gen-ai-response-loading-wrapper"
          height={'40%'}
          maxHeight={'350px'}
          flex={'0 1 40%'}
        >
          <Waiting src={suspenseImg} />
        </Box>
      </Modal>

      {promptResponse.length ? (
        <Box
          component={'div'}
          key={'gen-ai-response-wrapper'}
          id="gen-ai-response-wrapper"
          sx={{ height: 'fit-content', width: '60vw' }}
        >
          <Paper component={'div'} key={'gen-ai-response-paper'} id="gen-ai-response-paper" sx={fullSizeBlock}>
            <Container
              component={'div'}
              key={'gen-ai-response-container'}
              id="gen-ai-response-container"
              sx={fullSizeBlock}
            >
              <PromptResponse
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
