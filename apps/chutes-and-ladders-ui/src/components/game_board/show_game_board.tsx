import { GameBoardMap, RenderList, Theme } from '@bgdk/react-components';
import { GameBoard, ILiteSpace } from '@bgdk/games-components-logic';
import { Built_GameBoard } from '../../pages/active_game_session';
import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import { Fragment } from 'react';

const breakpointsGameBoardBox: SxProps = {
  border: `5px solid ${Theme.palette.success.main}`,
  [Theme.breakpoints.up('laptop')]: {
    boxShadow: `0px 7px 8px -4px ${Theme.palette.success.main}, 0px 12px 17px 2px ${Theme.palette.primary.light}, 0px 5px 22px 4px ${Theme.palette.primary.dark}, 0px -7px 8px -4px ${Theme.palette.success.main}, 0px -12px 17px 2px ${Theme.palette.primary.light}, 0px -5px 22px 4px ${Theme.palette.primary.dark}`,
  },
};

const gameBoardMap = (e: ILiteSpace[], i: number, arr: GameBoard) => (
  <Fragment key={Math.random().toFixed(4)}>
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
const ShowGameBoard = ({ board }: ShowGameBoardProps) => {
  return (
    <Box component={'section'} sx={breakpointsGameBoardBox}>
      {board && <RenderList data={board} listMapCallback={gameBoardMap} />}
    </Box>
  );
};

export default ShowGameBoard;