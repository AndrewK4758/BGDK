import { SxProps } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Variant } from '@mui/material/styles/createTypography';
import { ReactNode, type ElementType } from 'react';

export interface TextProps {
  titleVariant: Variant;
  id?: string;
  titleText: ReactNode;
  sx?: SxProps;
  component: ElementType;
}

export const Text = ({ component, id, titleVariant, titleText, sx }: TextProps) => (
  <Typography component={component} id={id} variant={titleVariant} sx={sx} data-testid={id}>
    {titleText}
  </Typography>
);

export default Text;
