import { Box, ListItem, SxProps } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { ElementType } from 'react';
import { Text } from '@bgdk/shared-react-components';

export interface HeadingWithDetailsProps {
  component: ElementType;
  id: string | number;
  titleVariant: Variant;
  titleText: string | undefined;
  titleSx?: SxProps;
  valueVariant: Variant;
  valueText: string;
  valueSx?: SxProps;
}

export function HeadingWithDetails({
  component,
  id,
  titleVariant,
  titleText,
  titleSx,
  valueVariant,
  valueText,
  valueSx,
}: HeadingWithDetailsProps) {
  return (
    <Box component={'div'} key={id}>
      <ListItem component={component}>
        <Text titleVariant={titleVariant} titleText={titleText} sx={titleSx} />
      </ListItem>
      <ListItem component={component}>
        <Text titleVariant={valueVariant} titleText={valueText} sx={valueSx} />
      </ListItem>
    </Box>
  );
}

export default HeadingWithDetails;
