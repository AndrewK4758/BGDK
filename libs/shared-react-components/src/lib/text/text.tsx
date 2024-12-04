import { SxProps } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Variant } from '@mui/material/styles/createTypography';
import { ReactNode } from 'react';

export interface TextProps {
  titleVariant: Variant;
  id?: string;
  titleText: ReactNode;
  sx?: SxProps;
}

export const Text = ({ id, titleVariant, titleText, sx }: TextProps) => (
  <Typography id={id} variant={titleVariant} sx={sx}>
    {titleText}
  </Typography>
);

export default Text;
