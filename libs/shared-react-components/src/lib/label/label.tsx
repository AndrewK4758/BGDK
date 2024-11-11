import Box from '@mui/material/Box';
import { type SxProps } from '@mui/material/styles';
import type { Variant } from '@mui/material/styles/createTypography';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { forwardRef, type ReactNode } from 'react';

export interface LabelProps {
  tooltipTitle: ReactNode;
  labelVariant: Variant;
  labelText: string;
  sx: SxProps;
  tooltipSx?: SxProps;
  placement:
    | 'bottom'
    | 'left'
    | 'right'
    | 'top'
    | 'bottom-end'
    | 'bottom-start'
    | 'left-end'
    | 'left-start'
    | 'right-end'
    | 'right-start'
    | 'top-end'
    | 'top-start'
    | undefined;
}

export const Label = forwardRef<HTMLDivElement, LabelProps>(
  ({ labelText, labelVariant, placement, sx, tooltipSx, tooltipTitle }, ref) => (
    <Box component={'span'} key={`${labelText}-wrapper-box`} id={`${labelText}-wrapper-box`} sx={{ display: 'flex' }}>
      <Tooltip
        id={`${labelText}-tooltip`}
        key={`${labelText}-tooltip`}
        ref={ref}
        describeChild={true}
        placement={placement}
        title={tooltipTitle}
        slotProps={{ tooltip: { sx: tooltipSx } }}
      >
        <Typography variant={labelVariant} key={`${labelText}-label-text`} id={`${labelText}-label-text`} sx={sx}>
          {labelText}
        </Typography>
      </Tooltip>
    </Box>
  ),
);

export default Label;
