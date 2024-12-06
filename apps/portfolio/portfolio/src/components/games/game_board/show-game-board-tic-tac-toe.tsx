import { GameBoardMapTicTacToe, Theme } from '@bgdk/react-components';
import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import type { GameBoard } from '@bgdk/types-game';
import type { Dispatch, JSX, SetStateAction } from 'react';

const breakpointsGameBoardBox: SxProps = {
  display: 'flex',
  flexWrap: 'wrap',
  border: `5px solid ${Theme.palette.success.main}`,
  minHeight: '55vh',
  maxHeight: '80vh',
  width: '50vw',
  justifySelf: 'center',
  [Theme.breakpoints.up('md')]: {
    boxShadow: `0px 7px 8px -4px ${Theme.palette.success.main}, 0px 12px 17px 2px ${Theme.palette.primary.light}, 0px 5px 22px 4px ${Theme.palette.primary.dark}, 0px -7px 8px -4px ${Theme.palette.success.main}, 0px -12px 17px 2px ${Theme.palette.primary.light}, 0px -5px 22px 4px ${Theme.palette.primary.dark}`,
  },
};

interface ShowGameBoardProps {
  board: GameBoard;
  state: string | undefined;
  setStateAction: Dispatch<SetStateAction<string | undefined>>;
}

/**
 *
 * @returns a rendered tic tac toe game board
 */

const ShowGameBoardTicTacToe = ({ board, state, setStateAction }: ShowGameBoardProps) => (
  <Box
    key={'tic-tac-toe-whole-board'}
    id={'tic-tac-toe-whole-board'}
    component={'section'}
    sx={breakpointsGameBoardBox}
  >
    {board.map(
      (e, i, _arr): JSX.Element => (
        <GameBoardMapTicTacToe
          key={`${i}-row-ttt`}
          row={e}
          columns={3}
          id={`row-${i}`}
          container={true}
          direction="row"
          wrap="wrap"
          state={state}
          setStateAction={setStateAction}
        />
      ),
    )}
  </Box>
);

export default ShowGameBoardTicTacToe;
