import { GameBoard, ILiteSpace } from '@bgdk/games-components-logic';
import { GameBoardMap, RenderList, Theme } from '@bgdk/react-components';
import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import { Fragment } from 'react';
import { Built_GameBoard } from '../../games/active_game_session';

const breakpointsGameBoardBox: SxProps = {
  border: `5px solid ${Theme.palette.success.main}`,
  [Theme.breakpoints.up('laptop')]: {
    boxShadow: `0px 7px 8px -4px ${Theme.palette.success.main}, 0px 12px 17px 2px ${Theme.palette.primary.light}, 0px 5px 22px 4px ${Theme.palette.primary.dark}, 0px -7px 8px -4px ${Theme.palette.success.main}, 0px -12px 17px 2px ${Theme.palette.primary.light}, 0px -5px 22px 4px ${Theme.palette.primary.dark}`,
  },
};

/**
 *
 * @param e ILiteSpace array or a ROW
 * @param i index of space in row
 * @param _arr ROW array of spaces
 * @returns built ui GameBoard
 */

const gameBoardMap = (e: ILiteSpace[], i: number, _arr: GameBoard) => (
  <Fragment key={Math.random()}>
    <GameBoardMap row={e} columns={10} container={true} direction="row" wrap="wrap" id={`Row ${i}`} />
  </Fragment>
);

interface ShowGameBoardProps {
  board: Built_GameBoard;
}

/**
 *
 * @returns a rendered game board
 */
const ShowGameBoard = ({ board }: ShowGameBoardProps) => (
  <Box component={'section'} sx={breakpointsGameBoardBox}>
    {board && <RenderList data={board} listMapCallback={gameBoardMap} />}
  </Box>
);

export default ShowGameBoard;
