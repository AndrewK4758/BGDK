import { GameBoardMapTicTacToe } from '@bgdk/react-components';
import type { GameBoard } from '@bgdk/types-game';
import Box from '@mui/material/Box';
import type { Dispatch, JSX, SetStateAction } from 'react';
import { breakpointsGameBoardBoxTicTacToe } from '../../../styles/games-styles';

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
    sx={breakpointsGameBoardBoxTicTacToe}
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
