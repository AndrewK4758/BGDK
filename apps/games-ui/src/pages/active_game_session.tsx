import { IPlayersAndBoard } from '@aklapper/model';
import { Text } from '@aklapper/react-components';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Outlet, useRouteLoaderData } from 'react-router-dom';
import ActiveAvatars from '../components/game_board/active_avatars';
import ReadyToStart from '../components/game_board/ready_to_start_button';
import ResetGame from '../components/game_board/reset_game';
import TakeTurn from '../components/game_board/take_turn';

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
      <Box
        component={'div'}
        sx={{ height: 'calc(100% - 30vh)', marginY: '1.5rem' }}
      >
        <Outlet />
      </Box>
      <Container component={'section'}>
        <Box component={'div'} sx={{ flex: '1 0 50%' }}>
          <Text titleVariant="h2" titleText={playerInTurn} />
        </Box>
        <TakeTurn />
        <ResetGame />
      </Container>
    </>
  );
}
