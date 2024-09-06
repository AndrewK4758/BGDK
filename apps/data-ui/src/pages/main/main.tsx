import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';

const MainWrapper = () => {
  return (
    <Box component={'div'} key={'main-home-wrapper'} sx={{ paddingTop: '2rem' }}>
      <Box component={'div'} key={'artists-albums-tracks-wrapper'}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainWrapper;
