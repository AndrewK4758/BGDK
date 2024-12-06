import Box from '@mui/material/Box';
import type { SxProps } from '@mui/material/styles';
import type { JSX } from 'react';

export interface RenderListProps {
  data: unknown[];
  listMapCallback(e: unknown, i: number, arr: unknown[]): JSX.Element;
  sx?: SxProps;
  id?: string;
}

export const RenderList = ({ id, data, listMapCallback, sx }: RenderListProps) => (
  <Box key={id} id={id} sx={sx}>
    {data.map(listMapCallback)}
  </Box>
);
