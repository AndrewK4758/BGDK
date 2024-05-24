// import styles from './heading-with-details.module.css';
import { Box, ListItem, SxProps } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { ElementType } from 'react';
import Text from '../../text/text';

/* eslint-disable-next-line */
export interface HeadingWithDetailsProps {
  component: ElementType;
  id: string | number;
  sx?: SxProps;
  titleVariant: Variant;
  titleText: string | undefined;
  valueVariant: Variant;
  valueText: string;
}

export function HeadingWithDetails({
  component,
  id,
  sx,
  titleVariant,
  titleText,
  valueVariant,
  valueText,
}: HeadingWithDetailsProps) {
  return (
    <Box component={'div'} key={id} sx={sx}>
      <ListItem component={component}>
        <Text titleVariant={titleVariant} titleText={titleText} />
      </ListItem>
      <ListItem component={component} sx={sx}>
        <Text titleVariant={valueVariant} titleText={valueText} sx={{ paddingX: '1rem' }} />
      </ListItem>
    </Box>
  );
}

export default HeadingWithDetails;
