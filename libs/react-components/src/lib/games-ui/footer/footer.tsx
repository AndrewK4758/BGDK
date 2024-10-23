import { SxProps } from '@mui/material';
import Paper from '@mui/material/Paper';
import Text from '../text/text';
import { ElementType } from 'react';

export interface FooterProps {
  component: ElementType;
  breakpointsFooter?: SxProps;
  breakpointsFooterText?: SxProps;
}

export function Footer({ component, breakpointsFooter, breakpointsFooterText }: FooterProps) {
  return (
    <Paper component={component} sx={breakpointsFooter}>
      <Text titleVariant={'h3'} titleText={`\u00A9 A.Klapper ${new Date().getFullYear()}`} sx={breakpointsFooterText} />
    </Paper>
  );
}

export default Footer;
