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

import { Waiting } from '@bgdk/shared-react-components';

const body = `Yes, these are simple board games. When you take the concept of a board game, break it down into its individual parts, find the similarities and generalizations between board games generally, and isolate what makes each game unique, you can take this simple concept and generate a group of objects that you can easily build any board style game upon.`;

export const Games = () => {
  const navigation = useNavigation();
  const submit = useSubmit();

  console.log('before click', navigation.state);

  const handleClick = (gameName: string) => {
    submit(gameName, { method: 'post', replace: true, encType: 'text/plain' });
  };

  console.log('after click', navigation);
  return (
    <Box
      component={'div'}
      key={'games-wrapper'}
      id="games-wrapper"
      sx={{
        flex: '1 0 100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '10vh',
      }}
      onLoad={e => handleScrollIntoView(e)}
    >
      <Paper elevation={0} component={'div'} key={'games-header-wrapper'} id="games-header-wrapper">
        <AppBar elevation={24} position="static" sx={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
          <Toolbar component={'nav'} sx={{ display: 'flex', justifyContent: 'space-evenly', flex: '1 0 100%' }}>
            {/* <Form
              // action={gameName}
              method="post"
              encType="text/plain"
              style={{ display: 'flex', justifyContent: 'space-evenly', flex: '1 0 100%' }}
            > */}
            <Button
              type="submit"
              color="inherit"
              title="Chutes & Ladders"
              name="game-name"
              id="Chutes-&-Ladders"
              endIcon={<ChutesAndLaddersIcon />}
              onClick={e => handleClick(e.currentTarget.id)}
              sx={{ fontSize: '2rem' }}
            >
              Chutes & Ladders
            </Button>

            <Button
              type="submit"
              color="inherit"
              title="Tic Tac Toe"
              name="game-name"
              id="Tic-Tac-Toe"
              endIcon={<TicTacToeIcon />}
              onClick={e => handleClick(e.currentTarget.id)}
              sx={{ fontSize: '2rem' }}
            >
              Tic Tac Toe
            </Button>
            {/* </Form> */}
          </Toolbar>
        </AppBar>
        <Box component={'div'} key={'games-header-text-wrapper'} id="games-header-text-wrapper" sx={{ p: 2 }}>
          <Typography component={'p'} variant="body1" sx={{ paddingLeft: 1 }}>
            {body}
          </Typography>
        </Box>
      </Paper>
      <Box component={'div'} key={`games-app-wrapper`} id={`games-app-wrapper`}>
        {navigation.state === 'submitting' ? <Waiting /> : <Outlet />}
      </Box>
    </Box>
  );
};
