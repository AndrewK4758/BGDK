import { Text, Theme } from '@bgdk/react-components';
import { GameBoard, IPlayersAndBoard, IRegisterFormValues } from '@bgdk/types-game';
import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import ActiveAvatars from '../components/game_board/active_avatars';
import ReadyToStart from '../components/game_board/ready_to_start_button';
import ResetGame from '../components/game_board/reset_game';
import ShowGameBoard from '../components/game_board/show_game_board';
import TakeTurn from '../components/game_board/take_turn';
import { getGameInstanceInfo } from '../services/utils/utils';
import client from '../services/utils/web-socket/socket-instance';

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

export default function ActiveGameSession() {
  const [board, setBoard] = useState<GameBoard>([[]]);
  const [activePlayersInGame, setActivePlayersInGame] = useState<IRegisterFormValues[]>([]);
  const [winner, setWinner] = useState<string>('');
  const [avatarInTurn, setAvatarInTurn] = useState<string>('');
  const [buttonPress, setButtonPress] = useState<boolean>(false);

  const socketRef = useRef<Socket>(client);

  const socket = socketRef.current;

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log(`Player connected with ID: ${socket.id}`);
    });
    socket.emit('create-room', getGameInstanceInfo()?.gameInstanceID);
  });

  useEffect(() => {
    socket.emit('action', { action: 'board' });
    socket.on('game-data', ({ gameBoard, activePlayersInGame, winner, avatarInTurn }: IPlayersAndBoard) => {
      setBoard(gameBoard);
      setActivePlayersInGame(activePlayersInGame);
      setWinner(winner as string);
      setAvatarInTurn(avatarInTurn as string);
    });
    socket.on('no-game-error', error => {
      console.log(error);
    });
  }, [socket, buttonPress]);

  return (
    <>
      <Container component={'section'} sx={{ marginBottom: '2rem' }}>
        <ActiveAvatars avatarsInGame={activePlayersInGame} winner={winner} />

        <ReadyToStart buttonPress={buttonPress} setButtonPress={setButtonPress} />
      </Container>
      <Box component={'section'} sx={{ height: '55vh' }}>
        {board && <ShowGameBoard board={board as GameBoard} />}
      </Box>
      <Container component={'section'} sx={breakpointsBottomMenuGameBoard}>
        <Box component={'div'} sx={{ flex: '1 0 50%' }}>
          <Text titleVariant="h2" titleText={avatarInTurn} sx={breakpointsPlayerInTurnText} />
        </Box>
        <Container component={'section'} sx={breakpointsBottomMenuButtonsBox}>
          <TakeTurn buttonPress={buttonPress} setButtonPress={setButtonPress} />
          <ResetGame buttonPress={buttonPress} setButtonPress={setButtonPress} />
        </Container>
      </Container>
    </>
  );
}
