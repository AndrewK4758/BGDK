import { IPlayersAndBoard } from '@bgdk/chains-for-games';
import { rowFinder } from '@bgdk/games-components-logic';
import { Theme } from '@bgdk/react-components';
import { Text } from '@bgdk/shared-react-components';
import { ClientSocket } from '@bgdk/socket-io-client';
import { GameBoard, type GamePlayerValidation, IActivePlayersInGame, ILiteSpace, type Row } from '@bgdk/types-game';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import type { SxProps } from '@mui/material/styles';
import { useEffect, useReducer, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { ManagerOptions, Socket } from 'socket.io-client';
import useScrollIntoView from '../../hooks/use-scroll-into-view';
import getGameInstanceInfo from '../../utils/utils';
import ActiveAvatars from './game_board/active_avatars';
import ResetGame from './game_board/reset_game';
import ShowGameBoardTicTacToe from './game_board/show-game-board-tic-tac-toe';
import ShowGameBoard from './game_board/show_game_board';
import socketReducer, { ActionType } from './game_board/socket-reducer';
import TakeTurnTicTacToe from './game_board/take-turn-tic-tac-toe';
import TakeTurn from './game_board/take_turn';

const breakpointsBottomMenuGameBoard: SxProps = {
  display: 'flex',
  marginTop: '2rem',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
  [Theme.breakpoints.down('md')]: {
    marginTop: '1rem',
  },
};

const breakpointsPlayerInTurnText: SxProps = {
  [Theme.breakpoints.down('md')]: {
    fontSize: '1em',
  },
};

const breakpointsBottomMenuButtonsBox: SxProps = {
  flex: '0 1 30%',
  display: 'flex',
  justifyContent: 'space-evenly',
  [Theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
};

export interface IActiveGameInfo extends IActivePlayersInGame {
  gameBoard: GameBoard;
}

const socketInit = () => {
  return { gameBoard: [[]], activePlayersInGame: [], avatarInTurn: '', winner: '' } as IActiveGameInfo;
};

/**
 *
 * @returns Active Game Component
 */

const ActiveGameSession = () => {
  const socketManagerOptions: Partial<ManagerOptions> = {
    autoConnect: false,
    extraHeaders: { 'current-game': JSON.stringify(getGameInstanceInfo()) },
  };

  const clientSocket = new ClientSocket(import.meta.env.VITE_WS_SERVER_URL_GAMES, socketManagerOptions);
  const socketRef = useRef<Socket>(clientSocket.clientIo);
  const [state, dispatch] = useReducer(socketReducer, {}, socketInit);
  const [space, setSpace] = useState<string | undefined>();
  const divRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();

  const socket = socketRef.current;

  useScrollIntoView(divRef);

  useEffect(() => {
    if (!socket.connected) socket.connect();

    socket.on('connect', () => {
      console.log(`Player connected with ID: ${socket.id}`);
    });

    socket.emit('create-room', (getGameInstanceInfo() as GamePlayerValidation).gameInstanceID);

    return () => {
      socket.disconnect();
      socket.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    socket.emit('action', { action: ActionType.BOARD });

    socket.on('game-data', async ({ gameBoard, activePlayersInGame, winner, avatarInTurn }: IPlayersAndBoard) => {
      const gameBoardClient: GameBoard = [];
      const maxRowLength = Math.sqrt(gameBoard.length);
      let indexOfSpace = 1;
      let row: Row = [];
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
  }, [id]);

  return (
    <Paper key={`active-${id}-game`} id={`active-${id}-game`}>
      <Box
        ref={divRef}
        component={'section'}
        key={`${id}-active-avatar-wrapper`}
        id="active-avatar-wrapper"
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <ActiveAvatars avatarsInGame={state.activePlayersInGame} winner={state.winner} />
      </Box>

      <Box
        component={'section'}
        key={`${id}-game-board-wrapper`}
        id="game-board-wrapper"
        sx={{ height: 'fit-content', textAlign: 'center', paddingX: 4 }}
      >
        {id === 'Chutes-&-Ladders' ? (
          <ShowGameBoard key={`chutes-and-ladders-full-game-board-wrapper`} board={state.gameBoard} />
        ) : (
          <ShowGameBoardTicTacToe
            key={'tic-tac-toe-full-game-board-wrapper'}
            board={state.gameBoard}
            setStateAction={setSpace}
            state={space}
          />
        )}
      </Box>

      <Container
        component={'section'}
        key={`${id}-active-game-buttons-wrapper`}
        id="active-game-buttons-wrapper"
        sx={breakpointsBottomMenuGameBoard}
      >
        <Text titleVariant="h2" titleText={state.avatarInTurn} sx={breakpointsPlayerInTurnText} />
        <Box component={'section'} sx={breakpointsBottomMenuButtonsBox}>
          {id === 'Chutes-&-Ladders' ? (
            <TakeTurn avatarInTurn={state.avatarInTurn as string} dispatch={dispatch} socket={socket} />
          ) : (
            <TakeTurnTicTacToe
              avatarInTurn={state.avatarInTurn as string}
              dispatch={dispatch}
              socket={socket}
              position={space}
            />
          )}

          <ResetGame dispatch={dispatch} socket={socket} setSpace={setSpace} />
        </Box>
      </Container>
    </Paper>
  );
};

export default ActiveGameSession;
