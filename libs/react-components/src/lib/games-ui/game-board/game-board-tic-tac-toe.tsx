import { Text } from '@bgdk/shared-react-components';
import { type Row } from '@bgdk/types-game';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Grid2';
import type { SxProps } from '@mui/material/styles';
import type { CSSProperties, Dispatch, SetStateAction } from 'react';
import { Theme } from '../../theme/theme';

const breakpointsRowSx: SxProps = {
  display: 'flex',
  flex: 1,
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'nowrap',
  overflow: 'hidden',
  border: `3px solid ${Theme.palette.success.main}`,
  [Theme.breakpoints.down('md')]: {
    border: `1.5px solid ${Theme.palette.success.main}`,
  },
};

const breakpointsSpaceSx: SxProps = {
  display: 'none',
};

const avatarSize: CSSProperties = {
  width: 'auto',
  height: '120px',
};

export interface GameBoardPropsTicTacToe {
  row: Row;
  columns: number;
  container: boolean | undefined;
  direction: 'row' | 'column' | 'row-reverse' | 'column-reverse' | undefined;
  wrap: 'wrap' | 'nowrap' | undefined;
  gridSx?: SxProps;
  rowSx?: SxProps;
  id?: string;
  state: string | undefined;
  setStateAction: Dispatch<SetStateAction<string | undefined>>;
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
  id,
  wrap,
  state,
  setStateAction,
}: GameBoardPropsTicTacToe) => (
  <Grid2
    component={'section'}
    columns={columns}
    container={container}
    direction={direction}
    wrap={wrap}
    id={`row-${id}`}
    sx={{ height: '33.4 ', flex: '1 0 100%' }}
  >
    {row.map((e, i, _arr) => (
      <Grid2
        key={`space-${e.display}-${i}`}
        id={`space-${e.display}-${i}`}
        component={'div'}
        sx={breakpointsRowSx}
        onClick={e => setStateAction(e.currentTarget.textContent as string)}
        style={
          state === e.display
            ? { backgroundColor: '#FFD300', color: '#58278b' }
            : { backgroundColor: Theme.palette.background.default }
        }
      >
        {e.display.indexOf('g') === e.display.length - 1 ? (
          <Box sx={{ position: 'absolute', display: 'flex', justifyContent: 'center', flex: 1 }}>
            <img
              key={`${e.display}-avatar-${i}`}
              src={`./game-avatars/${e.display}`}
              alt={`${e.display} game piece`}
              style={avatarSize}
            />
          </Box>
        ) : (
          <Box>
            <Text
              component={'p'}
              key={`${e.display}-space`}
              titleVariant="body2"
              titleText={e.display}
              sx={breakpointsSpaceSx}
            />
          </Box>
        )}
      </Grid2>
    ))}
  </Grid2>
);

export default GameBoardMapTicTacToe;
