import { RenderList, Text } from '@bgdk/shared-react-components';
import { ILiteSpace } from '@bgdk/types-game';
import { SxProps } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { breakpointsRowSx, avatarSize, breakpointsSpaceSx, spaceStyle } from '../../styles/game-board-styles';

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
        key={`${e.display}-avatar-c&l`}
        id={`${e.display}-avatar-c&l`}
        data-testid={`${e.display}-avatar-c&l`}
        src={`./game-avatars/${e.display}`}
        alt={`${e.display} game piece`}
        style={avatarSize}
      />
    ) : (
      <Text
        component={'p'}
        key={`${e.display}-avatar-c&l`}
        id={`${e.display}-avatar-c&l`}
        data-testid={`${e.display}-avatar-c&l`}
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
