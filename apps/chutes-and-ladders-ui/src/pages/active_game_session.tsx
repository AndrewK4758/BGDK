import {
  GameBoard,
  GamePlayerValidation,
  IPlayersAndBoard,
  IRegisterFormValues,
} from '@bgdk/game-types';
import { Text, Theme } from '@bgdk/react-components';
import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ActiveAvatars from '../components/game_board/active_avatars';
import ReadyToStart from '../components/game_board/ready_to_start_button';
import ResetGame from '../components/game_board/reset_game';
import ShowGameBoard from '../components/game_board/show_game_board';
import TakeTurn from '../components/game_board/take_turn';
import { io, ManagerOptions, Socket } from 'socket.io-client';
import { getGameInstanceInfo } from '../services/utils/utils';
import { useEffect, useRef, useState } from 'react';

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
  const [board, setBoard] = useState<GameBoard>();
  const [activePlayersInGame, setActivePlayersInGame] = useState<
    IRegisterFormValues[]
  >([]);
  const [winner, setWinner] = useState<string | undefined>(undefined);
  const [avatarInTurn, setAvatarInTurn] = useState<string | undefined>(
    undefined
  );
  const [buttonPress, setButtonPress] = useState<boolean>(false);

  const managerOptions: Partial<ManagerOptions> = {
    autoConnect: false,
    query: getGameInstanceInfo() as GamePlayerValidation,
  };
  const client = io(import.meta.env.VITE_WS_SERVER_URL, managerOptions);

  const socketRef = useRef<Socket>(client);

  const socket = socketRef.current;

  useEffect(() => {
    socket.connect();
    socket.on('connect', () => {
      console.log('SOCKET ID: ', socket.id);
    });

    socket.on(
      'game-data',
      ({
        gameBoard,
        activePlayersInGame,
        winner,
        avatarInTurn,
      }: IPlayersAndBoard) => {
        console.log(avatarInTurn);
        console.log(...activePlayersInGame);
        console.log(winner);
        console.log(...gameBoard);
        setBoard(gameBoard);
        setActivePlayersInGame(activePlayersInGame);
        setWinner(winner);
        setAvatarInTurn(avatarInTurn);
      }
    );

    socket.on('no-game-error', (error) => {
      console.log(error);

      return () => {
        socket.disconnect();
      };
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, setBoard, buttonPress]);

  return (
    <>
      <Container component={'section'} sx={{ marginBottom: '2rem' }}>
        <ActiveAvatars avatarsInGame={activePlayersInGame} winner={winner} />

        <ReadyToStart
          buttonPress={buttonPress}
          setButtonPress={setButtonPress}
        />
      </Container>
      <Box component={'section'} sx={{ height: '55vh' }}>
        {board && <ShowGameBoard board={board as GameBoard} />}
      </Box>
      <Container component={'section'} sx={breakpointsBottomMenuGameBoard}>
        <Box component={'div'} sx={{ flex: '1 0 50%' }}>
          <Text
            titleVariant="h2"
            titleText={avatarInTurn}
            sx={breakpointsPlayerInTurnText}
          />
        </Box>
        <Container component={'section'} sx={breakpointsBottomMenuButtonsBox}>
          <TakeTurn buttonPress={buttonPress} setButtonPress={setButtonPress} />
          <ResetGame
            buttonPress={buttonPress}
            setButtonPress={setButtonPress}
          />
        </Container>
      </Container>
    </>
  );
}
