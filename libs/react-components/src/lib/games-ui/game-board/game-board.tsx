import { SxProps } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { Fragment } from 'react/jsx-runtime';
import { RenderList } from '../render-list/render-list';
import Text from '../text/text';
import { Theme } from '../../theme/theme';
import { ILiteSpace } from '@bgdk/types-game';
import { CSSProperties } from 'react';

/* eslint-disable-next-line */
export interface GameBoardProps {
  row: ILiteSpace[];
  columns: number;
  container: boolean | undefined;
  direction: 'row' | 'column' | 'row-reverse' | 'column-reverse' | undefined;
  wrap: 'wrap' | 'nowrap' | undefined;
  id: string | number;
  gridSx?: SxProps;
  rowSx?: SxProps;
}

const breakpointsRowSx: SxProps = {
  flex: '1 0 10%',
  height: '7vh',
  border: `3px solid ${Theme.palette.success.main}`,
  alignContent: 'center',
  justifyContent: 'center',
  [Theme.breakpoints.down('laptop')]: {
    border: `1.5px solid ${Theme.palette.success.main}`,
  },
};

const breakpointsSpaceSx: SxProps = {
  fontSize: '1.5rem',
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '.75rem',
  },
};

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

const gameBoardRowMap = (e: ILiteSpace, _i: number, _arr: string[]) => {
  const DisplayValue = () => {
    if (e.display.indexOf('g') === e.display.length - 1)
      return <img src={`./game-avatars/${e.display}`} alt={`${e.display} game piece`} style={avatarSize} />;
    else return <Text titleVariant="body2" titleText={e.display} sx={breakpointsSpaceSx} />;
  };
  return (
    <Fragment key={e.display}>
      <Grid2 sx={breakpointsRowSx}>
        <DisplayValue />
      </Grid2>
    </Fragment>
  );
};

export function GameBoardMap({ row, columns, container, direction, wrap, id, gridSx }: GameBoardProps) {
  return (
    <Grid2 columns={columns} container={container} direction={direction} wrap={wrap} key={id}>
      <RenderList data={row} listMapCallback={gameBoardRowMap} />
    </Grid2>
  );
}

export default GameBoardMap;
