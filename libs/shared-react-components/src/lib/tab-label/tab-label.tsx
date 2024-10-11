import type { Variant } from '@mui/material/styles/createTypography';
import type { SxProps } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Text } from '@bgdk/react-components';

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
    <Text titleVariant={mainVariant} titleText={mainText} sx={mainSx} />
    <Text titleVariant={subVariant} titleText={subText} sx={subSx} />
  </Box>
);

export default TabLabel;
