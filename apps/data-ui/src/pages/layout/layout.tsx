import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
import HomePage from '../home-page';

const Layout = () => {
  const nav = useNavigate();

  return (
    <Fragment key="App-Wrapper">
      <Box component={'header'} key={'header'}>
        <Paper
          component={'div'}
          key={'header-paper'}
          elevation={12}
          sx={{ position: 'sticky', left: 0, right: 0, top: 0, height: '80px', display: 'flex', zIndex: 10 }}
        >
          <Box
            sx={{
              flex: '1 0 100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            <Button type="button" variant="contained" onClick={() => nav('/')} sx={{ width: '123px' }}>
              Home
            </Button>
            <Button type="submit" variant="contained" onClick={() => nav('artists')} sx={{ width: '123px' }}>
              All Artists
            </Button>

            <Button type="submit" variant="contained" onClick={() => nav('albums')} sx={{ width: '123px' }}>
              All Albums
            </Button>

            <Button type="submit" variant="contained" onClick={() => nav('add-entry')} sx={{ width: '123px' }}>
              Add Entry
            </Button>
          </Box>
        </Paper>
      </Box>
      <Box
        key={'main'}
        component={'main'}
        id="main-outlet-wrapper"
        sx={{
          position: 'relative',
          zIndex: 2,
          height: '100vh',
          display: 'flex',
          minHeight: 'fit-content',
        }}
      >
        <HomePage />
      </Box>
      <Box
        key={'footer'}
        component={'footer'}
        sx={{ position: 'sticky', left: 0, right: 0, bottom: 0, width: '100%', zIndex: 10 }}
      >
        <Paper elevation={6}>
          <Typography variant="h3" sx={{ textAlign: 'center' }}>
            Footer
          </Typography>
        </Paper>
      </Box>
    </Fragment>
  );
};

export default Layout;
