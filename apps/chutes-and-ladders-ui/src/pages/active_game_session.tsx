import { IPlayersAndBoard } from '@bgdk/game-types';
import { Text, Theme } from '@bgdk/react-components';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useRouteLoaderData } from 'react-router-dom';
import ActiveAvatars from '../components/game_board/active_avatars';
import ReadyToStart from '../components/game_board/ready_to_start_button';
import ResetGame from '../components/game_board/reset_game';
import TakeTurn from '../components/game_board/take_turn';
import { SxProps } from '@mui/material';
import ShowGameBoard from '../components/game_board/show_game_board';

const breakpointsBottomMenuGameBoard: SxProps = {
  marginTop: '2rem',
  flexDirection: 'row',
  [Theme.breakpoints.down('laptop')]: {
    marginTop: '1rem',
  },
};

const breakpointsPlayerInTurnText: SxProps = {
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '1em',
  },
};

const breakpointsBottomMenuButtonsBox: SxProps = {
  flex: '1 0 50%',
  flexDirection: 'row',
  [Theme.breakpoints.down('tablet')]: {
    flexDirection: 'column',
  },
};

// incorporate all loader data into websocket

export default function ActiveGameSession() {
  const loader = useRouteLoaderData('gameBoard') as IPlayersAndBoard;

  const activePlayersInGame = loader.activePlayersInGame;
  const playerInTurn = loader.playerInTurn as string;

  return (
    <>
      <Container component={'section'} sx={{ marginBottom: '2rem' }}>
        <ActiveAvatars playersInGame={activePlayersInGame} />
        <ReadyToStart />
      </Container>
      <Box component={'section'} sx={{ height: '55vh' }}>
        <ShowGameBoard />
      </Box>
      <Container component={'section'} sx={breakpointsBottomMenuGameBoard}>
        <Box component={'div'} sx={{ flex: '1 0 50%' }}>
          <Text
            titleVariant="h2"
            titleText={playerInTurn}
            sx={breakpointsPlayerInTurnText}
          />
        </Box>
        <Container component={'section'} sx={breakpointsBottomMenuButtonsBox}>
          <TakeTurn />
          <ResetGame />
        </Container>
      </Container>
    </>
  );
}
