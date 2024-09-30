import { IPlayersAndBoard } from '@bgdk/chains-for-games';
import { GameBoard, ILiteSpace, rowFinder } from '@bgdk/games-components-logic';
import { Text, Theme } from '@bgdk/react-components';
import { IActivePlayersInGame } from '@bgdk/types-game';
import { Paper, SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Fragment, lazy, useEffect, useReducer, useRef } from 'react';
import { ManagerOptions, Socket } from 'socket.io-client';
import ActiveAvatars from '../game_board/active_avatars';
import ResetGame from '../game_board/reset_game';
import socketReducer, { ActionType } from '../game_board/socket-reducer';
import TakeTurn from '../game_board/take_turn';
import getGameInstanceInfo from '../../utils/utils';
import ClientSocket from '../../utils/web-socket/socket-instance';
import { useNavigation } from 'react-router-dom';

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

export type Built_GameBoard = GameBoard[];

export interface IActiveGameInfo extends IActivePlayersInGame {
  gameBoard: Built_GameBoard;
}

const socketInit = () => {
  return { gameBoard: [[]], activePlayersInGame: [], avatarInTurn: '', winner: '' } as IActiveGameInfo;
};

const ShowGameBoard = lazy(() => import('../game_board/show_game_board'));

export const ChutesAndLadders = () => {
  const managerOptions: Partial<ManagerOptions> = {
    autoConnect: false,
    extraHeaders: { 'current-game': JSON.stringify(getGameInstanceInfo()) },
  };

  const clientSocket = new ClientSocket(managerOptions);
  const [state, dispatch] = useReducer(socketReducer, {}, socketInit);
  const socketRef = useRef<Socket>(clientSocket.Socket);

  const navs = useNavigation();
  console.log(navs, 'in Tic-Tac-Toe');

  const socket = socketRef.current;

  useEffect(() => {
    console.log('mounted 1');

    if (!socket.connected) {
      socket.connect();
      socket.on('connect', () => {
        console.log(`Player connected with ID: ${socket.id}`);
      });
      socket.emit('create-room', getGameInstanceInfo()?.gameInstanceID);
    }
    // }, [socket]);

    // useEffect(() => {
    console.log('mounted 2');

    socket.emit('action', { action: ActionType.BOARD });
    socket.on('game-data', ({ gameBoard, activePlayersInGame, winner, avatarInTurn }: IPlayersAndBoard) => {
      const gameBoardClient: Built_GameBoard = [];
      const maxRowLength = Math.sqrt(gameBoard.length);
      let indexOfSpace = 1;
      let row: ILiteSpace[] = [];
      gameBoard.forEach((s: ILiteSpace) => {
        const rowCount = rowFinder(indexOfSpace, gameBoard.length);
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
    socket.on('no-game-error', ({ errorMessage }) => {
      console.error(errorMessage);
    });
    return () => {
      if (socket) socket.disconnect();
      console.log('unmounted');
    };
  }, [socket]);

  return (
    <Box
      component={'div'}
      key={'chutes-and-ladders-wrapper'}
      id="chutes-and-ladders-wrapper"
      // onLoad={e => handleScrollIntoView(e)}
    >
      <Paper>
        <Container component={'section'} sx={{ marginBottom: '2rem' }}>
          <ActiveAvatars avatarsInGame={state.activePlayersInGame} winner={state.winner} />
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
      </Paper>
    </Box>
  );
};

export default ChutesAndLadders;
