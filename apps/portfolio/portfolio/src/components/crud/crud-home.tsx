import { Text } from '@bgdk/shared-react-components';
import Box from '@mui/material/Box';
import { crudHomeTextStyles, crudHomeContainerSxProps } from '../../styles/crud-styles';

const CrudHome = () => (
  <Box component={'div'} id="crud-home-container" sx={crudHomeContainerSxProps}>
    <Text component={'h2'} titleText={'Make A Selection Above'} titleVariant="h2" sx={crudHomeTextStyles} />
  </Box>
);

export default CrudHome;
