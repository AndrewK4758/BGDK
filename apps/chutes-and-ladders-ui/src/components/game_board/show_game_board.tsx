import { GameBoard, ILiteSpace } from '@bgdk/game-types';
import { GameBoardMap, RenderList, Theme } from '@bgdk/react-components';
import Box from '@mui/material/Box';
import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { SxProps } from '@mui/material';
import { useState, useRef, useContext, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { SocketManagerContext } from '../socket-context';

const breakpointsGameBoardBox: SxProps = {
  border: `5px solid ${Theme.palette.success.main}`,
  [Theme.breakpoints.up('laptop')]: {
    boxShadow: `0px 7px 8px -4px ${Theme.palette.success.main}, 0px 12px 17px 2px ${Theme.palette.primary.light}, 0px 5px 22px 4px ${Theme.palette.primary.dark}, 0px -7px 8px -4px ${Theme.palette.success.main}, 0px -12px 17px 2px ${Theme.palette.primary.light}, 0px -5px 22px 4px ${Theme.palette.primary.dark}`,
  },
};

const gameBoardMap = (e: ILiteSpace[], i: number, arr: GameBoard) => (
  <Fragment key={`row ${i}`}>
    <GameBoardMap
      row={e}
      columns={10}
      container={true}
      direction="row"
      wrap="wrap"
      id={`Row ${i}`}
    />
  </Fragment>
);

/**
 * Verify that sending object literal with websocket fixes the recursion error
 * @returns a rendered game board
 */
const ShowGameBoard = () => {
  /* TRIAL FOR SOCKET.IO IMPLEMENTATON */

  const location = useLocation();
  const [board, setBoard] = useState<GameBoard | null>(null);

  const socketRef = useRef<Socket>();
  const manager = useContext(SocketManagerContext);

  useEffect(() => {
    socketRef.current = manager.socket(location.pathname);
    const { current: socket } = socketRef;

    socket.connect();

    socket.on('connect', async () => {
      socket.emit(`client info: ${socket.id}`);
    });

    socket.on('new-player', async ({ playerConnect }) => {
      console.log(playerConnect);
    });

    socket.on('board-load-return', async (data: GameBoard) => {
      console.log(`From take turn Socket MOTHER FUCKER `, data);
      setBoard(data);
    });
    // socket.emit('board-load', board);
  }, [setBoard, location.pathname, manager, board]);

  return (
    <Box component={'section'} sx={breakpointsGameBoardBox}>
      {board && <RenderList data={board} listMapCallback={gameBoardMap} />}
    </Box>
  );
};
export default ShowGameBoard;
