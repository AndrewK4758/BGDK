import { rowFinder } from '@bgdk/chutes-and-ladders';
import { Text, Theme } from '@bgdk/react-components';
import { Built_GameBoard, IActiveGameInfo, ILiteSpace, IPlayersAndBoard } from '@bgdk/types-game';
import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Fragment, useEffect, useReducer, useRef } from 'react';
import { Socket } from 'socket.io-client';
import ActiveAvatars from '../components/game_board/active_avatars';
import ReadyToStart from '../components/game_board/ready_to_start_button';
import ResetGame from '../components/game_board/reset_game';
import ShowGameBoard from '../components/game_board/show_game_board';
import TakeTurn from '../components/game_board/take_turn';
import socketReducer, { ActionType } from '../components/game_board/socket-reducer';
import { getGameInstanceInfo } from '../services/utils/utils';
import ClientSocket from '../services/utils/web-socket/socket-instance';

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

const socketInit = () => {
  return { gameBoard: [[]], activePlayersInGame: [], avatarInTurn: '', winner: '' } as IActiveGameInfo;
};

export default function ActiveGameSession() {
  const [state, dispatch] = useReducer(socketReducer, {}, socketInit);
  const socketRef = useRef<Socket>(ClientSocket);

  const socket = socketRef.current;

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log(`Player connected with ID: ${socket.id}`);
    });
    socket.emit('create-room', getGameInstanceInfo()?.gameInstanceID);
  });

  useEffect(() => {
    socket.emit('action', { action: ActionType.BOARD });
    socket.on('game-data', ({ gameBoard, activePlayersInGame, winner, avatarInTurn }: IPlayersAndBoard) => {
      const gameBoardClient: Built_GameBoard = [];
      const maxRowLength = 10;
      let indexOfSpace = 1;
      let row: ILiteSpace[] = [];
      gameBoard.forEach(s => {
        const rowCount = rowFinder(indexOfSpace);
        row.push(s);

        if (row.length === maxRowLength) {
          row = rowCount % 2 !== 0 ? row : row.reverse();
          gameBoardClient.push(row);
          row = [];
        }
        indexOfSpace++;
      });

      dispatch({
        type: ActionType.BOARD,
        payload: { gameBoard: gameBoardClient, activePlayersInGame, avatarInTurn, winner } as IActiveGameInfo,
      });
    });
    socket.on('no-game-error', error => {
      console.log(error);
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, [socket]);

  return (
    <>
      <Container component={'section'} sx={{ marginBottom: '2rem' }}>
        <ActiveAvatars avatarsInGame={state.activePlayersInGame} winner={state.winner} />
        <ReadyToStart dispatch={dispatch} socket={socket} />
      </Container>
      <Box component={'section'} sx={{ height: '55vh' }}>
        <ShowGameBoard board={state.gameBoard} />
      </Box>
      <Container component={'section'} sx={breakpointsBottomMenuGameBoard}>
        <Box component={'div'} sx={{ flex: '1 0 50%' }}>
          <Text titleVariant="h2" titleText={state.avatarInTurn} sx={breakpointsPlayerInTurnText} />
        </Box>
        <Container component={'section'} sx={breakpointsBottomMenuButtonsBox}>
          <Fragment key={Math.random().toFixed(4)}>
            <TakeTurn dispatch={dispatch} socket={socket} />
            <ResetGame dispatch={dispatch} socket={socket} />
          </Fragment>
        </Container>
      </Container>
    </>
  );
}
