import { SxProps } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Fragment } from 'react/jsx-runtime';
import RenderList from '../render-list/render-list';
import Text from '../text/text';
import { Theme } from '../theme/theme';
import { ILiteSpace } from '@bgdk/games-components-logic';
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
  height: '5.4vh',
  border: `3px solid ${Theme.palette.success.main}`,
  alignContent: 'center',
  justifyContent: 'center',
  [Theme.breakpoints.down('laptop')]: {
    border: `1.5px solid ${Theme.palette.success.main}`,
  },
};

const breakpointsSpaceSx: SxProps = {
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '.75rem',
  },
};

const avatarSize: CSSProperties = {
  width: '100%',
  height: '100%',
};

const gameBoardRowMap = (e: ILiteSpace, i: number, arr: string[]) => {
  const DisplayValue = () => {
    if (e.display.indexOf('g') === e.display.length - 1)
      return <img src={`./game-avatars/${e.display}`} alt={`${e.display} game piece`} style={avatarSize} />;
    else return <Text titleVariant="body2" titleText={e.display} sx={breakpointsSpaceSx} />;
  };
  return (
    <Fragment key={e.display}>
      <Grid sx={breakpointsRowSx}>
        <DisplayValue />
      </Grid>
    </Fragment>
  );
};

export function GameBoardMap({ row, columns, container, direction, wrap, id, gridSx }: GameBoardProps) {
  return (
    <Grid columns={columns} container={container} direction={direction} wrap={wrap} key={id}>
      <RenderList data={row} listMapCallback={gameBoardRowMap} />
    </Grid>
  );
}

export default GameBoardMap;