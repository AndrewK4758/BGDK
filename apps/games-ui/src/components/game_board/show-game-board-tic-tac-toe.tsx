import { GameBoardMapTicTacToe, Theme } from '@bgdk/react-components';
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

interface ShowGameBoardProps {
  board: Built_GameBoard;
  state: (EventTarget & HTMLDivElement) | undefined;
  setStateAction: (e: EventTarget & HTMLDivElement) => void;
}

/**
 *
 * @returns a rendered game board
 */

const ShowGameBoardTicTacToe = ({ board, state, setStateAction }: ShowGameBoardProps) => {
  return (
    <Box component={'section'} sx={breakpointsGameBoardBox}>
      {board.map((e, i, _arr): JSX.Element => {
        return (
          <Fragment key={Math.random().toFixed(4)}>
            <GameBoardMapTicTacToe
              row={e}
              columns={3}
              container={true}
              direction="row"
              wrap="wrap"
              id={`Row ${i}`}
              state={state}
              setStateAction={setStateAction}
            />
          </Fragment>
        );
      })}
    </Box>
  );
};

export default ShowGameBoardTicTacToe;
