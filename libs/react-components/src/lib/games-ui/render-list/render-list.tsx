import type { SxProps } from '@mui/material/styles';
import Box from '@mui/material/Box';

export interface RenderListProps {
  data: unknown[];
  listMapCallback(e: unknown, i: number, arr: unknown[]): JSX.Element;
  sx?: SxProps;
}

export const RenderList = ({ data, listMapCallback, sx }: RenderListProps) => (
  <Box sx={sx}>{data.map(listMapCallback)}</Box>
);
