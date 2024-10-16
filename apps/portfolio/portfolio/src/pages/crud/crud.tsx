import { Text } from '@bgdk/react-components';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { type SxProps } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { lazy, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Theme from '../../styles/theme';
import handleScrollIntoView from '../../utils/handle-scroll-into-view';

const CrudHome = lazy(() => import('../../components/crud/crud-home'));

const title = 'C.R.U.D. Data Manager';

const body = (
  <span>
    Example of crud app with MUI X- DataGrid, debounced search bar, columns have sorting & filtering, cells can be
    updated and changes are represented on the client and back end in real time, full cell values can be seen by
    hovering, rows can be deleted, each catagory has the ability to create an entry, ADD ENTRY provides the opportunity
    to add all fields at once, uses public{' '}
    <Link
      target="_blank"
      rel="noopener"
      to={'https://github.com/lerocha/chinook-database'}
      style={{ color: Theme.palette.secondary.contrastText }}
      onMouseOver={e => {
        e.currentTarget.style.backgroundColor = Theme.palette.secondary.dark;
      }}
      onMouseOut={e => {
        e.currentTarget.style.backgroundColor = Theme.palette.background.paper;
      }}
    >
      Chinook Database
    </Link>{' '}
    as the data.
  </span>
);

const titleSx: SxProps = {
  width: 'fit-content',
  maxWidth: '80%',
  textAlign: 'center',
  flex: '1 0 100%',
};

const Crud = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const nav = useNavigate();

  useEffect(() => {
    if (divRef.current) handleScrollIntoView(divRef.current);
  }, []);

  return (
    <Box
      ref={divRef}
      component={'div'}
      key={'crud-wrapper'}
      id="crud-wrapper"
      sx={{
        flex: '1 0 80%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '10vh',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={24}
        component={'div'}
        key={'crud-header-wrapper'}
        id="crud-header-wrapper"
        sx={{ width: '55%' }}
      >
        <Box
          component={'section'}
          key={'crud-title-wrapper'}
          id="crud-title-wrapper"
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Text titleVariant="h3" titleText={title} sx={titleSx} />
        </Box>
        <AppBar component={'div'} elevation={24} position="static">
          <Toolbar
            component={'nav'}
            sx={{ display: 'flex', justifyItems: 'space-evenly', alignItems: 'center', flex: '1 0 100%' }}
          >
            <Button
              type="button"
              variant="text"
              onClick={() => nav('/crud')}
              sx={{ flex: '1 0 25%', color: Theme.palette.text.secondary, fontSize: '1.5rem' }}
            >
              Home
            </Button>
            <Button
              type="submit"
              variant="text"
              onClick={() => nav('artists')}
              sx={{ flex: '1 0 25%', color: Theme.palette.text.secondary, fontSize: '1.5rem' }}
            >
              All Artists
            </Button>

            <Button
              type="submit"
              variant="text"
              onClick={() => nav('albums')}
              sx={{ flex: '1 0 25%', color: Theme.palette.text.secondary, fontSize: '1.5rem' }}
            >
              All Albums
            </Button>

            <Button
              type="submit"
              variant="text"
              onClick={() => nav('add-entry')}
              sx={{ flex: '1 0 25%', color: Theme.palette.text.secondary, fontSize: '1.5rem' }}
            >
              Add Entry
            </Button>
          </Toolbar>
        </AppBar>
        <Box component={'div'} key={'crud-header-text-wrapper'} id="crud-header-text-wrapper" sx={{ p: 2 }}>
          <Typography component={'p'} variant="body1" sx={{ paddingLeft: 1 }}>
            {body}
          </Typography>
        </Box>
      </Paper>

      <Box
        component={'div'}
        key={`crud-app-wrapper`}
        id={`crud-app-wrapper`}
        sx={{
          width: '90%',
          minHeight: '100%',
          height: 'fit-content',
        }}
      >
        <CrudHome />
      </Box>
    </Box>
  );
};

export default Crud;
