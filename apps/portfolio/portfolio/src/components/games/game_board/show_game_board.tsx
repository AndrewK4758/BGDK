import { GameBoardMap, Theme } from '@bgdk/react-components';
import { RenderList } from '@bgdk/shared-react-components';
import { GameBoard, ILiteSpace } from '@bgdk/types-game';
import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';

const breakpointsGameBoardBox: SxProps = {
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  border: `5px solid ${Theme.palette.success.main}`,
  [Theme.breakpoints.up('md')]: {
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
  <GameBoardMap
    key={`chutes-&-ladders-row-${i}`}
    row={e}
    columns={10}
    container={true}
    direction="row"
    wrap="wrap"
    id={`Row ${i}`}
    rowSx={{ flex: '1 0 100%' }}
  />
);

interface ShowGameBoardProps {
  board: GameBoard;
}

/**
 *
 * @returns a rendered game board
 */
const ShowGameBoard = ({ board }: ShowGameBoardProps) => (
  <Box key={`game-board-length-${board.length}`} component={'section'} sx={breakpointsGameBoardBox}>
    <RenderList data={board} listMapCallback={gameBoardMap} sx={{ flex: '1 0 100%' }} />
  </Box>
);

export default ShowGameBoard;
