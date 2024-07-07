import { GameBoardMap, RenderList, Theme } from '@bgdk/react-components';
import { GameBoard } from '@bgdk/types-game';
import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import { Fragment } from 'react';
import { rowFinder } from '@bgdk/chutes-and-ladders';

const breakpointsGameBoardBox: SxProps = {
  border: `5px solid ${Theme.palette.success.main}`,
  [Theme.breakpoints.up('laptop')]: {
    boxShadow: `0px 7px 8px -4px ${Theme.palette.success.main}, 0px 12px 17px 2px ${Theme.palette.primary.light}, 0px 5px 22px 4px ${Theme.palette.primary.dark}, 0px -7px 8px -4px ${Theme.palette.success.main}, 0px -12px 17px 2px ${Theme.palette.primary.light}, 0px -5px 22px 4px ${Theme.palette.primary.dark}`,
  },
};

const gameBoardMap = (e: string[], i: number, arr: GameBoard) => (
  <Fragment key={`row ${i}`}>
    <GameBoardMap row={e} columns={10} container={true} direction="row" wrap="wrap" id={`Row ${i}`} />
  </Fragment>
);

interface ShowGameBoardProps {
  board: GameBoard;
}

/**
 *
 * @returns a rendered game board
 */
const ShowGameBoard = ({ board }: ShowGameBoardProps) => {
  const maxRowLength = 10;
  let indexOfSpace = 1;
  let row: string[] = [];
  const gameBoard: string[][] = [];
  board.forEach(s => {
    const rowCount = rowFinder(indexOfSpace);
    row.push(s);

    if (row.length === maxRowLength) {
      row = rowCount % 2 !== 0 ? row : row.reverse();
      gameBoard.push(row);
      row = [];
    }
    indexOfSpace++;
  });

  return (
    <Box component={'section'} sx={breakpointsGameBoardBox}>
      {board && <RenderList data={gameBoard} listMapCallback={gameBoardMap} />}
    </Box>
  );
};

export default ShowGameBoard;