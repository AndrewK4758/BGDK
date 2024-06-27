// import styles from './game-board.module.css';
import { SxProps } from '@mui/material';
import Grid from '@mui/material/Grid';
import RenderList from '../render-list/render-list';
import Text from '../text/text';
import { Theme } from '../theme/theme';
import { Fragment } from 'react/jsx-runtime';
import { ILiteSpace } from '@bgdk/game-types';

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
  [Theme.breakpoints.down('laptop')]: {
    border: `1.5px solid ${Theme.palette.success.main}`,
  },
};

const breakpointsSpaceSx: SxProps = {
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '.75rem',
  },
};

// Explore best way to render game board with websocket

const gameBoardRowMap = (e: ILiteSpace, i: number, arr: string[]) => {
  return (
    <Fragment key={i + 100}>
      <Grid key={e.Display} sx={breakpointsRowSx}>
        <Text
          titleVariant="body2"
          titleText={e.Display}
          sx={breakpointsSpaceSx}
        />
      </Grid>
    </Fragment>
  );
};

export function GameBoardMap({
  row,
  columns,
  container,
  direction,
  wrap,
  id,
  gridSx,
}: GameBoardProps) {
  return (
    <Grid
      columns={columns}
      container={container}
      direction={direction}
      wrap={wrap}
      key={id}
    >
      <RenderList data={row} listMapCallback={gameBoardRowMap} />
    </Grid>
  );
}

export default GameBoardMap;
