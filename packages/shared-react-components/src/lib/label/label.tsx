import Box from '@mui/material/Box';
import { type SxProps } from '@mui/material/styles';
import type { Variant } from '@mui/material/styles/createTypography';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { forwardRef, type JSX, type ReactNode } from 'react';

const labelWrapperSxProps: SxProps = {
  display: 'flex',
  justifyContent: 'space-evenly',
  alignContent: 'center',
  gap: 2,
};

const labelBoxSxProps: SxProps = { display: 'flex', alignContent: 'center' };

export interface LabelProps {
  tooltipTitle: ReactNode;
  labelVariant: Variant;
  labelText: string;
  sx?: SxProps;
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
  Icon?: JSX.Element | undefined;
  children?: ReactNode | ReactNode[];
}

export const Label = forwardRef<HTMLDivElement, LabelProps>(
  ({ labelText, labelVariant, placement, sx, tooltipSx, tooltipTitle, Icon, children }, ref) => (
    <Box component={'span'} key={`${labelText}-wrapper-box`} id={`${labelText}-wrapper-box`} sx={labelWrapperSxProps}>
      <Box
        component={'span'}
        key={`${labelText}-box`}
        id={`${labelText}-box`}
        display={'flex'}
        alignItems={'center'}
        gap={1}
      >
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
        <Box component={'span'} key={`${labelText}-icon`} id={`${labelText}-icon`} sx={labelBoxSxProps}>
          {Icon}
        </Box>
      </Box>
      {children && (
        <Box component={'span'} key={`${labelText}-box-children`} id={`${labelText}-box-children`} sx={labelBoxSxProps}>
          {children}
        </Box>
      )}
    </Box>
  ),
);

export default Label;
