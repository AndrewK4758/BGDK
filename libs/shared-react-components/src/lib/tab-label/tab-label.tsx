import type { Variant } from '@mui/material/styles/createTypography';
import type { SxProps } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface TabLabelProps {
  mainVariant: Variant;
  subVariant: Variant;
  mainText: string;
  subText: string;
  mainSx?: SxProps;
  subSx?: SxProps;
}

export const TabLabel = ({ mainVariant, mainText, mainSx, subVariant, subText, subSx }: TabLabelProps) => (
  <Box>
    <Typography variant={mainVariant} sx={mainSx}>
      {mainText}
    </Typography>
    <Typography variant={subVariant} sx={subSx}>
      {subText}
    </Typography>
  </Box>
);

export default TabLabel;
