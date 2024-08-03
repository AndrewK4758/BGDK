// import styles from './title.module.css';
import { SxProps } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Variant } from '@mui/material/styles/createTypography';
import { ReactNode } from 'react';

/* eslint-disable-next-line */
export interface TextProps {
  titleVariant: Variant;
  titleText: string | ReactNode;
  sx?: SxProps;
}

export function Text({ titleVariant, titleText, sx }: TextProps) {
  return (
    <Typography variant={titleVariant} sx={sx}>
      {titleText}
    </Typography>
  );
}

export default Text;
