import { Text } from '@bgdk/shared-react-components';
import { type Row } from '@bgdk/types-game';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Grid2';
import type { SxProps } from '@mui/material/styles';
import type { Dispatch, SetStateAction } from 'react';
import {
  avatarTTTSize,
  breakpointsRowTTTSx,
  breakpointsSpaceTTTSx,
  nonSelectedSpaceStyle,
  rowSizeTTT,
  selectedSpaceStyle,
  svgSpaceTTTStyles,
} from '../../styles/game-board-styles';

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
 * @param {GameBoardPropsTicTacToe} params needed to render each space and handle the color change when selected
 * @param {Row} GameBoardPropsTicTacToe.row - The row data for the grid.
 * @param {number} GameBoardPropsTicTacToe.columns - The number of columns in the grid.
 * @param {boolean | undefined} GameBoardPropsTicTacToe.container - Whether the grid should be a container.
 * @param {'row' | 'column' | 'row-reverse' | 'column-reverse' | undefined} GameBoardPropsTicTacToe.direction - The flex direction of the grid.
 * @param {'wrap' | 'nowrap' | undefined} GameBoardPropsTicTacToe.wrap - The flex wrap behavior of the grid.
 * @param {SxProps} [GameBoardPropsTicTacToe.gridSx] - Optional styling properties for the grid container.
 * @param {SxProps} [GameBoardPropsTicTacToe.rowSx] - Optional styling properties for the grid rows.
 * @param {string} [GameBoardPropsTicTacToe.id] - Optional ID for the grid container.
 * @param {string | undefined} GameBoardPropsTicTacToe.state - The current state of the grid.
 * @param {Dispatch<SetStateAction<string | undefined>>} GameBoardPropsTicTacToe.setStateAction - A function to update the grid's state.
 * @returns Renderable list of spaces for tic tac toe board
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
    sx={rowSizeTTT}
  >
    {row.map((e, i, _arr) => (
      <Grid2
        key={`space-${e.display}-${i}`}
        id={`space-${e.display}-${i}`}
        component={'div'}
        sx={breakpointsRowTTTSx}
        onClick={e => setStateAction(e.currentTarget.textContent as string)}
        style={state === e.display ? selectedSpaceStyle : nonSelectedSpaceStyle}
      >
        {e.display.indexOf('g') === e.display.length - 1 ? (
          <Box
            key={`${e.display}-svg-wrapper-space-${i}`}
            id={`${e.display}-svg-wrapper-space-${i}`}
            data-testid={`${e.display}-svg-wrapper-space-${i}`}
            sx={svgSpaceTTTStyles}
          >
            <img
              key={`${e.display}-avatar-${i}`}
              src={`./game-avatars/${e.display}`}
              alt={`${e.display} game piece`}
              style={avatarTTTSize}
            />
          </Box>
        ) : (
          <Box>
            <Text
              component={'p'}
              key={`${e.display}-space`}
              id={`${e.display}-space`}
              data-testid={`${e.display}-space`}
              titleVariant="body2"
              titleText={e.display}
              sx={breakpointsSpaceTTTSx}
            />
          </Box>
        )}
      </Grid2>
    ))}
  </Grid2>
);

export default GameBoardMapTicTacToe;
