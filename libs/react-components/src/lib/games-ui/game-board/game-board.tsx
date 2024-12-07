import { RenderList, Text } from '@bgdk/shared-react-components';
import { ILiteSpace } from '@bgdk/types-game';
import { SxProps } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { CSSProperties } from 'react';
import { Theme } from '../../theme/theme';

export interface GameBoardProps {
  row: ILiteSpace[];
  columns: number;
  container: boolean | undefined;
  direction: 'row' | 'column' | 'row-reverse' | 'column-reverse' | undefined;
  wrap: 'wrap' | 'nowrap' | undefined;
  id: string | undefined;
  gridSx?: SxProps;
  rowSx?: SxProps;
}

const breakpointsRowSx: SxProps = {
  flex: '1 0 10%',
  height: '7vh',
  border: `3px solid ${Theme.palette.success.main}`,
  alignContent: 'center',
  justifyContent: 'center',
  [Theme.breakpoints.down('md')]: {
    border: `1.5px solid ${Theme.palette.success.main}`,
  },
};

const breakpointsSpaceSx: SxProps = {
  fontSize: '1.5rem',
  [Theme.breakpoints.down('md')]: {
    fontSize: '.75rem',
  },
};

const spaceStyle: SxProps = { display: 'flex', flex: '1 0 100%' };

const avatarSize: CSSProperties = {
  alignSelf: 'self-start',
  width: 'auto',
  height: '112%',
};

/**
 *
 * @param e ILiteSpace
 * @param _i index of space
 * @param _arr array of spaces
 * @returns each space for provided row
 */

const gameBoardRowMap = (e: ILiteSpace, i: number, _arr: string[]) => (
  <Grid2 key={`space-${i}-${e.display}`} sx={breakpointsRowSx}>
    {e.display.indexOf('g') === e.display.length - 1 ? (
      <img
        id={`${e.display}-avatar-c&l`}
        src={`./game-avatars/${e.display}`}
        alt={`${e.display} game piece`}
        style={avatarSize}
      />
    ) : (
      <Text
        component={'p'}
        id={`${e.display}-avatar-c&l`}
        titleVariant="body2"
        titleText={e.display}
        sx={breakpointsSpaceSx}
      />
    )}
  </Grid2>
);

export const GameBoardMap = ({ row, columns, container, direction, wrap, id, rowSx }: GameBoardProps) => (
  <Grid2 columns={columns} container={container} direction={direction} wrap={wrap} id={id} sx={rowSx}>
    <RenderList data={row} listMapCallback={gameBoardRowMap} sx={spaceStyle} />
  </Grid2>
);

export default GameBoardMap;
