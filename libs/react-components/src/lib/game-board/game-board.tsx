// import styles from './game-board.module.css';
import { SxProps } from '@mui/material';
import Grid from '@mui/material/Grid';
import RenderList from '../render-list/render-list';
import Text from '../text/text';
import { Theme } from '../theme/theme';
import { Fragment } from 'react/jsx-runtime';

/* eslint-disable-next-line */
export interface GameBoardProps {
  row: string[];
  columns: number;
  container: boolean | undefined;
  direction: 'row' | 'column' | 'row-reverse' | 'column-reverse' | undefined;
  wrap: 'wrap' | 'nowrap' | undefined;
  id: string | number;
  sx?: SxProps;
}

const gameBoardRowMap = (e: string, i: number, arr: string[]) => (
  <Fragment key={e}>
    <Grid key={e} sx={{ flex: '1 0 10%', border: `3px solid ${Theme.palette.success.main}` }}>
      <Text titleVariant="body2" titleText={e} />
    </Grid>
  </Fragment>
);

export function GameBoardMap({ row, columns, container, direction, wrap, id, sx }: GameBoardProps) {
  return (
    <Grid columns={columns} container={container} direction={direction} wrap={wrap} key={id} sx={sx}>
      <RenderList data={row} listMapCallback={gameBoardRowMap} />
    </Grid>
  );
}

export default GameBoardMap;
