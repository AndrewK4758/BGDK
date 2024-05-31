import { IPlayersAndBoard } from '@aklapper/model';
import { Text, Theme } from '@aklapper/react-components';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Outlet, useRouteLoaderData } from 'react-router-dom';
import ActiveAvatars from '../components/game_board/active_avatars';
import ReadyToStart from '../components/game_board/ready_to_start_button';
import ResetGame from '../components/game_board/reset_game';
import TakeTurn from '../components/game_board/take_turn';
import { SxProps } from '@mui/material';

const breakpointsBottomMenuGameBoard: SxProps = {
  [Theme.breakpoints.down('laptop')]: {
    marginTop: '1rem',
  },
};

const breakpointsPlayerInTurnText: SxProps = {
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '1em',
  },
};

export default function ActiveGameSession() {
  const loader = useRouteLoaderData('gameBoard') as IPlayersAndBoard;
  const activePlayersInGame = loader.activePlayersInGame;
  const playerInTurn = loader.playerInTurn as string;

  return (
    <>
      <Container component={'section'}>
        <ActiveAvatars playersInGame={activePlayersInGame} />
        {activePlayersInGame.length > 1 && <ReadyToStart />}
      </Container>
      <Box component={'div'} sx={{ height: 'fit-content' }}>
        <Outlet />
      </Box>
      <Container component={'section'} sx={breakpointsBottomMenuGameBoard}>
        <Box component={'div'} sx={{ flex: '1 0 50%' }}>
          <Text
            titleVariant="h2"
            titleText={playerInTurn}
            sx={breakpointsPlayerInTurnText}
          />
        </Box>
        <Box component={'div'} sx={{ flex: '1 0 50%' }}>
          <TakeTurn />
          <ResetGame />
        </Box>
      </Container>
    </>
  );
}
