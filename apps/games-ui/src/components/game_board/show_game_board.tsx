import { GameBoardMap, RenderList, Theme } from '@bgdk/react-components';
import { GameBoard, ILiteSpace } from '@bgdk/types-game';
import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';

const breakpointsGameBoardBox: SxProps = {
  border: `5px solid ${Theme.palette.success.main}`,
  [Theme.breakpoints.up('laptop')]: {
    boxShadow: `0px 7px 8px -4px ${Theme.palette.success.main}, 0px 12px 17px 2px ${Theme.palette.primary.light}, 0px 5px 22px 4px ${Theme.palette.primary.dark}, 0px -7px 8px -4px ${Theme.palette.success.main}, 0px -12px 17px 2px ${Theme.palette.primary.light}, 0px -5px 22px 4px ${Theme.palette.primary.dark}`,
  },
};

const gameBoardMap = (e: ILiteSpace[], i: number, _arr: GameBoard) => (
  <GameBoardMap row={e} columns={10} container={true} direction="row" wrap="wrap" id={`Row ${i}`} />
);

interface ShowGameBoardProps {
  board: GameBoard;
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
