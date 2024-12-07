import { Text } from '@bgdk/shared-react-components';
import Box from '@mui/material/Box';
import type { JSX } from 'react';
import { crudHomeContainerSxProps, crudHomeTextStyles } from '../../styles/crud-styles';

/**
 * This component renders the home screen for the CRUD section.
 * It displays a message prompting the user to make a selection from the navigation bar.
 *
 * @returns {JSX.Element} The rendered CRUD home component.
 */

const CrudHome = (): JSX.Element => (
  <Box component={'div'} id="crud-home-container" sx={crudHomeContainerSxProps}>
    <Text component={'h2'} titleText={'Make A Selection Above'} titleVariant="h2" sx={crudHomeTextStyles} />
  </Box>
);

export default CrudHome;
