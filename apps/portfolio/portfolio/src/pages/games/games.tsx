import { Text } from '@bgdk/shared-react-components';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import { useRef, useState, type Dispatch, type SetStateAction } from 'react';
import { Outlet, useNavigation, useSubmit, type SubmitFunction } from 'react-router-dom';
import ChutesAndLaddersIcon from '../../components/icons/chutes-and-ladders';
import TicTacToeIcon from '../../components/icons/tic-tac-toe-icon';
import useScrollIntoView from '../../hooks/use-scroll-into-view';
import {
  pagesButtonStyles,
  pagesOutletStyles,
  pagesTitlesBoxStyles,
  pagesTitleSx,
  pagesToolbarStyles,
  pagesWrapperStyles,
} from '../../styles/pages-styles';
import { body, title } from '../static/games-text';

const Games = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { state } = useNavigation();
  const divRef = useRef<HTMLElement>(null);
  const submit = useSubmit();

  useScrollIntoView(divRef);

  return (
    <Box ref={divRef} component={'div'} key={'games-wrapper'} id="games-wrapper" sx={pagesWrapperStyles}>
      <Paper
        elevation={24}
        component={'div'}
        key={'games-header-wrapper'}
        id="games-header-wrapper"
        sx={{ width: '60vw' }}
      >
        <Box component={'section'} key={'games-title-wrapper'} id="games-title-wrapper" sx={pagesTitlesBoxStyles}>
          <Text component={'h3'} titleVariant="h3" titleText={title} sx={pagesTitleSx} />
        </Box>
        <AppBar
          component={'div'}
          id="games-navbar-wrapper"
          key={'games-navbar-wrapper'}
          elevation={24}
          position="static"
        >
          <Toolbar component={'nav'} id="games-navbar" key={'games-navbar'} sx={pagesToolbarStyles}>
            <Button
              LinkComponent={'button'}
              key={'chutes-and-ladders-button'}
              title="Chutes & Ladders"
              id="Chutes-&-Ladders"
              disabled={state === 'submitting'}
              endIcon={<ChutesAndLaddersIcon state={state} />}
              onClick={e => handleSelectGame(e.currentTarget.id, submit, setLoading)}
              sx={pagesButtonStyles}
            >
              Chutes & Ladders
            </Button>

            <Button
              LinkComponent={'button'}
              key={'tic-tac-toe-button'}
              type="submit"
              title="Tic Tac Toe"
              id="Tic-Tac-Toe"
              disabled={state === 'submitting'}
              endIcon={<TicTacToeIcon state={state} />}
              onClick={e => handleSelectGame(e.currentTarget.id, submit, setLoading)}
              sx={pagesButtonStyles}
            >
              Tic Tac Toe
            </Button>
          </Toolbar>
        </AppBar>
        <Container
          component={'div'}
          key={'games-header-text-wrapper'}
          id="games-header-text-wrapper"
          sx={{ paddingY: 2 }}
        >
          <Text component={'p'} key={'game-header-text'} id="game-header-text" titleVariant="body1" titleText={body} />
        </Container>
      </Paper>
      <Box component={'div'} key={`games-outlet-wrapper`} id={`games-outlet-wrapper`} sx={pagesOutletStyles}>
        {!loading && <Outlet />}
      </Box>
    </Box>
  );
};

export default Games;

const handleSelectGame = async (
  gameName: string,
  submit: SubmitFunction,
  setLoading: Dispatch<SetStateAction<boolean>>,
) => {
  try {
    setLoading(true);
    await submit(gameName, { method: 'post', relative: 'path', encType: 'text/plain' });
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
