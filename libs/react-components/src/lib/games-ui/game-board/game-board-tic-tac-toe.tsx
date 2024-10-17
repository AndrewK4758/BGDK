import { SxProps } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import Text from '../text/text.tsx';
import { Theme } from '../../theme/theme.tsx';
import { ILiteSpace } from '@bgdk/games-components-logic';
import type { CSSProperties } from 'react';

const breakpointsRowSx: SxProps = {
  display: 'flex',
  flex: '1 0 33%',
  justifyItems: 'center',
  alignItems: 'center',
  border: `3px solid ${Theme.palette.success.main}`,
  alignContent: 'center',
  justifyContent: 'center',
  [Theme.breakpoints.down('laptop')]: {
    border: `1.5px solid ${Theme.palette.success.main}`,
  },
};

const breakpointsSpaceSx: SxProps = {
  fontSize: '4rem',
  display: 'none',
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '.75rem',
  },
};

const avatarSize: CSSProperties = {
  width: '40%',
  height: 'auto',
  border: 5,
};


export interface GameBoardPropsTicTacToe {
  row: ILiteSpace[];
  columns: number;
  container: boolean | undefined;
  direction: 'row' | 'column' | 'row-reverse' | 'column-reverse' | undefined;
  wrap: 'wrap' | 'nowrap' | undefined;
  gridSx?: SxProps;
  rowSx?: SxProps;
  state: HTMLDivElement | undefined;
  setStateAction: (e: HTMLDivElement) => void;
}

/**
 *
 * @param param0 params needed to render each space and handle the color change when selected
 * @returns list of spaces for tic tac toe board
 */

export const GameBoardMapTicTacToe = ({
  row,
  columns,
  container,
  direction,
  wrap,
  state,
  setStateAction,
}: GameBoardPropsTicTacToe) => (
  <Grid2
    columns={columns}
    container={container}
    direction={direction}
    wrap={wrap}
    sx={{ height: '33.3%', flex: '1 0 100%' }}
  >
    {row.map((e, _i, _arr) => {
      return (
        <Grid2
          component={'div'}
          sx={breakpointsRowSx}
          onClick={e => setStateAction(e.currentTarget)}
          style={
            state?.textContent === e.display
              ? { backgroundColor: '#FFD300', color: '#58278b' }
              : { backgroundColor: Theme.palette.background.default }
          }
        >
          {e.display.indexOf('g') === e.display.length - 1 ? (
            <img
              key={`tic-tac-toe-space-${e.display}-svg`}
              src={`./game-avatars/${e.display}`}
              alt={`${e.display} game piece`}
              style={avatarSize}
            />
          ) : (
            <Text
              key={`tic-tac-toe-space-${e.display}`}
              titleVariant="body2"
              titleText={e.display}
              sx={breakpointsSpaceSx}
            />
          )}
        </Grid2>
      );
    })}
  </Grid2>
);


export default GameBoardMapTicTacToe;
