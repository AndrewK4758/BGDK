import { Button, Container, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const Layout = () => {
  const { pathname } = useLocation();
  const nav = useNavigate();

  return (
    <>
      <Box key={'header'} component={'header'}>
        <Paper
          elevation={12}
          sx={{ position: 'fixed', left: 0, right: 0, top: 0, height: '80px', display: 'flex', zIndex: 100 }}
        >
          <Box sx={{ flex: '1 0 100%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <Button type="button" variant="contained" onClick={() => nav('artists')}>
              Artist
            </Button>
            <Button type="button" variant="contained" onClick={() => nav('albums')}>
              Album
            </Button>
          </Box>
        </Paper>
      </Box>
      <Container key={'main'} component={'main'} sx={{ position: 'relative', top: 80, paddingTop: '25px' }}>
        {pathname === '/' && (
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            CLICK ON ARTIST OR ALBUM TO SEARCH OR ADD ENTRIES
          </Typography>
        )}

        <Outlet />
      </Container>
      <Box key={'footer'} component={'footer'} sx={{ position: 'fixed', bottom: 0, right: 0, left: 0, width: '100%' }}>
        <Typography variant="h3" sx={{ textAlign: 'center' }}>
          Footer
        </Typography>
      </Box>
    </>
  );
};

export default Layout;

