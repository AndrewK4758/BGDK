import { Text } from '@bgdk/react-components';
import { Waiting } from '@bgdk/shared-react-components';
import { handleScrollIntoView } from '@bgdk/utils';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import type { SxProps } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import { Outlet, useNavigation, useSubmit } from 'react-router-dom';
import ChutesAndLaddersIcon from '../../components/icons/chutes-and-ladders';
import TicTacToeIcon from '../../components/icons/tic-tac-toe-icon';
import Theme from '../../styles/theme';

const title = 'Games';

const body = `Yes, these are simple board games. When you take the concept of a board game, break it down into its individual parts, find the similarities and generalizations between board games and isolate what makes each game unique, you can take this simple concept and generate a group of objects that you can easily build any board style game upon.`;

const titleSx: SxProps = {
  width: 'fit-content',
  maxWidth: '80%',
  textAlign: 'center',
  flex: '1 0 100%',
};

const Games = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { state } = useNavigation();
  const divRef = useRef<HTMLElement>(null);
  const submit = useSubmit();

  useEffect(() => {
    if (divRef.current) handleScrollIntoView(divRef.current);
  }, []);

  const handleSelectGame = async (gameName: string, setLoading: Dispatch<SetStateAction<boolean>>) => {
    try {
      setLoading(true);
      await submit(gameName, { method: 'post', relative: 'path', encType: 'text/plain' });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      ref={divRef}
      component={'div'}
      key={'games-wrapper'}
      id="games-wrapper"
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
        key={'games-header-wrapper'}
        id="games-header-wrapper"
        sx={{ width: '60vw' }}
      >
        <Box
          component={'section'}
          key={'games-title-wrapper'}
          id="games-title-wrapper"
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingY: 2 }}
        >
          <Text titleVariant="h3" titleText={title} sx={titleSx} />
        </Box>
        <AppBar
          component={'div'}
          id="games-navbar-wrapper"
          key={'games-navbar-wrapper'}
          elevation={24}
          position="static"
        >
          <Toolbar
            component={'nav'}
            id="games-navbar"
            key={'games-navbar'}
            sx={{ display: 'flex', justifyContent: 'space-evenly', flex: '1 0 100%' }}
          >
            <Button
              LinkComponent={'button'}
              key={'chutes-and-ladders-button'}
              variant="text"
              type="submit"
              title="Chutes & Ladders"
              id="Chutes-&-Ladders"
              disabled={state === 'submitting'}
              endIcon={<ChutesAndLaddersIcon />}
              onClick={e => handleSelectGame(e.currentTarget.id, setLoading)}
              sx={{ fontSize: '2rem', color: Theme.palette.text.secondary }}
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
              endIcon={<TicTacToeIcon />}
              onClick={e => handleSelectGame(e.currentTarget.id, setLoading)}
              sx={{ fontSize: '2rem', color: Theme.palette.text.secondary }}
            >
              Tic Tac Toe
            </Button>
          </Toolbar>
        </AppBar>
        <Box component={'div'} key={'games-header-text-wrapper'} id="games-header-text-wrapper" sx={{ p: 2 }}>
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
        component={'div'}
        key={`games-app-wrapper`}
        id={`games-app-wrapper`}
        sx={{ width: '80%', minHeight: '100%', height: 'fit-content' }}
      >
        {!loading ? <Outlet /> : <Waiting />}
      </Box>
    </Box>
  );
};

export default Games;
