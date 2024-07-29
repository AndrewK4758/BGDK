import { SxProps } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Fragment } from 'react/jsx-runtime';
import Text from '../text/text';
import { Theme } from '../theme/theme';
import { ILiteSpace } from '@bgdk/games-components-logic';
import { CSSProperties, MouseEvent } from 'react';

/* eslint-disable-next-line */
export interface GameBoardPropsTicTacToe {
  row: ILiteSpace[];
  columns: number;
  container: boolean | undefined;
  direction: 'row' | 'column' | 'row-reverse' | 'column-reverse' | undefined;
  wrap: 'wrap' | 'nowrap' | undefined;
  id: string | number;
  gridSx?: SxProps;
  rowSx?: SxProps;
  setStateAction: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
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

export function GameBoardMapTicTacToe({
  row,
  columns,
  container,
  direction,
  wrap,
  id,
  setStateAction,
}: GameBoardPropsTicTacToe) {
  return (
    <Grid columns={columns} container={container} direction={direction} wrap={wrap} key={id}>
      {row.map((e, _i, _arr) => {
        return (
          <Fragment key={Math.random().toFixed(4)}>
            <Grid component={'div'} sx={breakpointsRowSx} onClick={e => setStateAction(e)}>
              {e.display.indexOf('g') === e.display.length - 1 ? (
                <img src={`./game-avatars/${e.display}`} alt={`${e.display} game piece`} style={avatarSize} />
              ) : (
                <Text titleVariant="body2" titleText={e.display} sx={breakpointsSpaceSx} />
              )}
            </Grid>
          </Fragment>
        );
      })}
    </Grid>
  );
}

export default GameBoardMapTicTacToe;
