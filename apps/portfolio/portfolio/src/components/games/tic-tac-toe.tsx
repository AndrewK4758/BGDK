import { IPlayersAndBoard } from '@bgdk/chains-for-games';
import { GameBoard, ILiteSpace } from '@bgdk/games-components-logic';
import { Text, Theme } from '@bgdk/react-components';
import { IActivePlayersInGame } from '@bgdk/types-game';
import { Paper, SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Fragment, lazy, useEffect, useReducer, useRef, useState } from 'react';
import { ManagerOptions, Socket } from 'socket.io-client';
import ActiveAvatars from '../game_board/active_avatars';
import { useNavigation } from 'react-router-dom';
import ResetGame from '../game_board/reset_game';
import socketReducer, { ActionType } from '../game_board/socket-reducer';
import getGameInstanceInfo from '../../utils/utils';
import ClientSocket from '../../utils/web-socket/socket-instance';
import TakeTurnTicTacToe from '../game_board/take-turn-tic-tac-toe';

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

const ShowGameBoard = lazy(() => import('../game_board/show-game-board-tic-tac-toe'));

export const TicTacToe = () => {
  const managerOptions: Partial<ManagerOptions> = {
    autoConnect: false,
    extraHeaders: { 'current-game': JSON.stringify(getGameInstanceInfo()) },
  };
  const clientSocket = new ClientSocket(managerOptions);
  const [state, dispatch] = useReducer(socketReducer, {}, socketInit);
  const [space, setSpace] = useState<(EventTarget & HTMLDivElement) | undefined>(undefined);
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
      let row: ILiteSpace[] = [];
      gameBoard.forEach((s: ILiteSpace) => {
        row.push(s);

        if (row.length === maxRowLength) {
          gameBoardClient.push(row);
          row = [];
        }
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
      key={'tic-tac-toe-wrapper'}
      id="tic-tac-toe-wrapper"
      // onLoad={e => handleScrollIntoView(e)}
    >
      <Paper>
        <Container component={'section'} sx={{ marginBottom: '2rem' }}>
          <ActiveAvatars avatarsInGame={state.activePlayersInGame} winner={state.winner} />
          {/* <ReadyToStart dispatch={dispatch} socket={socket} /> */}
        </Container>
        <Box component={'section'} sx={{ height: '55vh' }}>
          <ShowGameBoard board={state.gameBoard} setStateAction={setSpace} state={space} />
        </Box>
        <Container component={'section'} sx={breakpointsBottomMenuGameBoard}>
          <Box component={'div'} sx={{ flex: '1 0 50%' }}>
            <Text titleVariant="h2" titleText={state.avatarInTurn} sx={breakpointsPlayerInTurnText} />
          </Box>
          <Container component={'section'} sx={breakpointsBottomMenuButtonsBox}>
            <Fragment key={Math.random().toFixed(4)}>
              <TakeTurnTicTacToe dispatch={dispatch} socket={socket} position={space} />
              <ResetGame dispatch={dispatch} socket={socket} />
            </Fragment>
          </Container>
        </Container>
      </Paper>
    </Box>
  );
};

export default TicTacToe;
