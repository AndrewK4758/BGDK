import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import { Outlet, useNavigation, useSubmit } from 'react-router-dom';
import ChutesAndLaddersIcon from '../../components/icons/chutes-and-ladders';
import TicTacToeIcon from '../../components/icons/tic-tac-toe-icon';
import handleScrollIntoView from '../../services/events/handle-scroll-into-view';
import Theme from '../../styles/theme';
import GameLoading from '../../components/loading/loading';
import { useEffect, useRef, useState } from 'react';

const body = `Yes, these are simple board games. When you take the concept of a board game, break it down into its individual parts, find the similarities and generalizations between board games generally, and isolate what makes each game unique, you can take this simple concept and generate a group of objects that you can easily build any board style game upon.`;

const Games = () => {
  const { state } = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement>(null);
  const submit = useSubmit();

  useEffect(() => {
    if (divRef.current) handleScrollIntoView(divRef.current);
  }, []);

  useEffect(() => {
    const renderTimer = setTimeout(() => setLoading(false), 3000);

    return () => clearTimeout(renderTimer);
  }, [state]);

  const handleClick = (gameName: string) => {
    setLoading(true);
    submit(gameName, { method: 'post', relative: 'path', replace: true, encType: 'text/plain' });
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
        sx={{ width: '55%' }}
      >
        <AppBar elevation={24} position="static" sx={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
          <Toolbar component={'nav'} sx={{ display: 'flex', justifyContent: 'space-evenly', flex: '1 0 100%' }}>
            <Button
              variant="text"
              type="submit"
              title="Chutes & Ladders"
              name="game-name"
              id="Chutes-&-Ladders"
              disabled={state === 'submitting'}
              endIcon={<ChutesAndLaddersIcon />}
              onClick={e => handleClick(e.currentTarget.id)}
              sx={{ fontSize: '2rem', color: Theme.palette.text.secondary }}
            >
              Chutes & Ladders
            </Button>

            <Button
              type="submit"
              title="Tic Tac Toe"
              name="game-name"
              id="Tic-Tac-Toe"
              disabled={state === 'submitting'}
              endIcon={<TicTacToeIcon />}
              onClick={e => handleClick(e.currentTarget.id)}
              sx={{ fontSize: '2rem', color: Theme.palette.text.secondary }}
            >
              Tic Tac Toe
            </Button>
          </Toolbar>
        </AppBar>
        <Box component={'div'} key={'games-header-text-wrapper'} id="games-header-text-wrapper" sx={{ p: 2 }}>
          <Typography component={'p'} variant="body1" sx={{ paddingLeft: 1 }}>
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
        {loading ? <GameLoading /> : <Outlet />}
      </Box>
    </Box>
  );
};

export default Games;
