import { Text } from '@bgdk/react-components';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Outlet, useLocation } from 'react-router-dom';
import CrudTheme from '../../styles/crud-theme';
import Theme from '../../styles/theme';

const CrudHome = () => {
  const { pathname } = useLocation();

  return (
    <ThemeProvider theme={CrudTheme}>
      <Box
        component={'div'}
        id="crud-home-container"
        sx={{
          display: 'flex',
          flex: '1 0 100%',
          borderRadius: 1,
          backgroundColor: Theme.palette.background.default,
          height: '100%',
          padding: 2,
        }}
      >
        <Box
          key={'crud-outlet-wrapper'}
          id="crud-outlet-wrapper"
          sx={{
            flex: 3,
            height: 'fit-content',
            minHeight: '100%',
            display: 'flex',
          }}
        >
          <Box component={'div'} id="data-grid-grids" flex={3} sx={{ backgroundColor: 'white', minHeight: '100%' }}>
            {pathname === '/crud' && (
              <Text
                titleText={'Make A Selection Above'}
                titleVariant="h2"
                sx={{
                  alignContent: 'center',
                  justifySelf: 'center',
                  color: '#1f1f1f',
                  textAlign: 'center',
                  height: '100%',
                }}
              />
            )}

            <Outlet />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CrudHome;
