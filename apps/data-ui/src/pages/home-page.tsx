import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Text } from '@bgdk/react-components';

const HomePage = () => {
  const { pathname } = useLocation();
  return (
    <Box component={'section'} key={'main-h1-wrapper'}>
      {pathname === '/' && (
        <Text
          titleVariant="h1"
          titleText={'CLICK ON ARTIST OR ALBUM TO SEARCH OR ADD ENTRIES'}
          sx={{ textAlign: 'center' }}
        />
      )}
    </Box>
  );
};

export default HomePage;
