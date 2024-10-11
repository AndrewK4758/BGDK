import type { SxProps } from '@mui/material/styles';
import type { Variant } from '@mui/material/styles/createTypography';
import Typography from '@mui/material/Typography';

export interface LabelProps {
  labelVariant: Variant;
  labelText: string;
  sx: SxProps;
}

export const Label = ({ labelVariant, labelText, sx }: LabelProps) => (
  <Typography variant={labelVariant} sx={sx}>
    {labelText}
  </Typography>
);

export default Label;
