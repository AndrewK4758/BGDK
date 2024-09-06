import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { Fragment, useState } from 'react';
import AddEntry from '../../components/add-entry/add-entry';
import MainWrapper from '../main/main';

const Layout = () => {
  const nav = useNavigate();

  const [open, setOpen] = useState<boolean>(false);
  return (
    <Fragment key="App-Wrapper">
      <Paper
        component={'header'}
        key={'header'}
        elevation={12}
        sx={{ position: 'absolute', left: 0, right: 0, top: 0, height: '80px', display: 'flex', zIndex: 1 }}
      >
        <Box
          sx={{
            flex: '1 0 100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
        >
          <Button type="submit" variant="contained" onClick={() => nav('artists')}>
            All Artists
          </Button>

          <Button type="submit" variant="contained" onClick={() => nav('albums')}>
            All Albums
          </Button>

          <Button type="submit" variant="contained" onClick={() => setOpen(!open)}>
            Add Entry
          </Button>
        </Box>
      </Paper>
      <Container
        key={'main'}
        component={'main'}
        sx={{
          position: 'relative',
          top: 80,
          bottom: 80,
          zIndex: 2,
        }}
      >
        <MainWrapper />
      </Container>
      <Box
        key={'footer'}
        component={'footer'}
        sx={{ position: 'absolute', bottom: 0, right: 0, left: 0, width: '100%', zIndex: 10 }}
      >
        <Paper elevation={6}>
          <Typography variant="h3" sx={{ textAlign: 'center' }}>
            Footer
          </Typography>
        </Paper>
      </Box>

      <AddEntry open={open} setOpen={setOpen} />
    </Fragment>
  );
};

export default Layout;
