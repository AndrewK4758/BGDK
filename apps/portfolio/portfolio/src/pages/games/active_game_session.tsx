import { IPlayersAndBoard } from '@bgdk/chains-for-games';
import { GameBoard, ILiteSpace, rowFinder } from '@bgdk/games-components-logic';
import { Text, Theme } from '@bgdk/react-components';
import { IActivePlayersInGame, type GamePlayerValidation } from '@bgdk/types-game';
import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Fragment, useEffect, useReducer, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ManagerOptions, Socket } from 'socket.io-client';
import ActiveAvatars from '../../components/game_board/active_avatars';
import ReadyToStart from '../../components/game_board/ready_to_start_button';
import ResetGame from '../../components/game_board/reset_game';
import ShowGameBoard from '../../components/game_board/show_game_board';
import ShowGameBoardTicTacToe from '../../components/game_board/show-game-board-tic-tac-toe';
import socketReducer, { ActionType } from '../../components/game_board/socket-reducer';
import TakeTurn from '../../components/game_board/take_turn';
import getGameInstanceInfo from '../../utils/utils';
import ClientSocket from '../../utils/web-socket/socket-instance';
import TakeTurnTicTacToe from '../../components/game_board/take-turn-tic-tac-toe';

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

const ActiveGameSession = () => {
  const managerOptions: Partial<ManagerOptions> = {
    autoConnect: false,
    extraHeaders: { 'current-game': JSON.stringify(getGameInstanceInfo()) },
  };

  const clientSocket = new ClientSocket(managerOptions);
  const [state, dispatch] = useReducer(socketReducer, {}, socketInit);
  const [space, setSpace] = useState<(EventTarget & HTMLDivElement) | undefined>(undefined);
  const socketRef = useRef<Socket>(clientSocket.Socket);
  const params = useParams();
  const id = params.id;

  const socket = socketRef.current;

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
      socket.on('connect', () => {
        console.log(`Player connected with ID: ${socket.id}`);
      });
      socket.emit('create-room', (getGameInstanceInfo() as GamePlayerValidation).gameInstanceID);
    }

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
          if (id === 'Chutes-&-Ladders') {
            row = rowCount % 2 !== 0 ? row : row.reverse();
          }
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
  }, [socket, id]);

  return (
    <>
      <Container component={'section'} sx={{ marginBottom: '2rem' }}>
        <ActiveAvatars avatarsInGame={state.activePlayersInGame} winner={state.winner} />
        <ReadyToStart dispatch={dispatch} socket={socket} />
      </Container>
      <Box component={'section'} sx={{ height: '55vh' }}>
        {id === 'Chutes-&-Ladders' && <ShowGameBoard key={id} board={state.gameBoard} />}
        {id === 'Tic-Tac-Toe' && (
          <ShowGameBoardTicTacToe key={id} board={state.gameBoard} setStateAction={setSpace} state={space} />
        )}
      </Box>
      <Container component={'section'} sx={breakpointsBottomMenuGameBoard}>
        <Box component={'div'} sx={{ flex: '1 0 50%' }}>
          <Text titleVariant="h2" titleText={state.avatarInTurn} sx={breakpointsPlayerInTurnText} />
        </Box>
        <Container component={'section'} sx={breakpointsBottomMenuButtonsBox}>
          <Fragment key={Math.random().toFixed(4)}>
            {id === 'Chutes-&-Ladders' && <TakeTurn dispatch={dispatch} socket={socket} />}
            {id === 'Tic-Tac-Toe' && <TakeTurnTicTacToe dispatch={dispatch} socket={socket} position={space} />}
            <ResetGame dispatch={dispatch} socket={socket} />
          </Fragment>
        </Container>
      </Container>
    </>
  );
};

export default ActiveGameSession;
