import { Text } from '@bgdk/shared-react-components';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import { lazy, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import CrudHome from '../../components/crud/crud-home';
import useScrollIntoView from '../../hooks/use-scroll-into-view';
import { crudAppWrapperStyles, crudDataGridGridsSxProps, crudPaperSxProps } from '../../styles/crud-styles';
import {
  headerModalButtonStyles,
  modalButtonBoxStyles,
  pagesButtonStyles,
  pagesTitlesBoxStyles,
  pagesTitleSx,
  pagesToolbarStyles,
  pagesWrapperStyles,
} from '../../styles/pages-styles';
import { body, title } from '../static/crud-text';

const Search = lazy(() => import('../../components/crud/search'));

const Crud = () => {
  const [open, setOpen] = useState<boolean>(false);
  const divRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  const nav = useNavigate();

  useScrollIntoView(divRef);

  return (
    <Box ref={divRef} component={'div'} key={'crud-wrapper'} id="crud-wrapper" sx={pagesWrapperStyles}>
      <Paper
        elevation={24}
        component={'div'}
        key={'crud-header-wrapper'}
        id="crud-header-wrapper"
        sx={{ width: '60vw' }}
      >
        <Box component={'section'} key={'crud-title-wrapper'} id="crud-title-wrapper" sx={pagesTitlesBoxStyles}>
          <Text component={'h3'} titleVariant="h3" titleText={title} sx={pagesTitleSx} />
        </Box>
        <AppBar component={'div'} id="crud-navbar-wrapper" key={'crud-navbar-wrapper'} elevation={24} position="static">
          <Toolbar component={'nav'} id="crud-navbar" key={'crud-navbar'} sx={pagesToolbarStyles}>
            <Button
              LinkComponent={'button'}
              key={'crud-home-button'}
              id="crud-home-button"
              onClick={() => nav('/crud')}
              sx={pagesButtonStyles}
            >
              Home
            </Button>
            <Button type="submit" variant="text" onClick={() => nav('artists')} sx={pagesButtonStyles}>
              All Artists
            </Button>
            <Button type="submit" variant="text" onClick={() => nav('albums')} sx={pagesButtonStyles}>
              All Albums
            </Button>
            <Button type="submit" variant="text" onClick={() => nav('add-entry')} sx={pagesButtonStyles}>
              Add Entry
            </Button>
          </Toolbar>
        </AppBar>
        <Container
          component={'div'}
          key={'crud-header-text-wrapper'}
          id="crud-header-text-wrapper"
          sx={{ paddingY: 2 }}
        >
          <Text key={'crud-header-text'} id="crud-header-text" component={'p'} titleVariant="body1" titleText={body} />
        </Container>
        <Box key={'crud-search-button'} id={'crud-search-button'} sx={modalButtonBoxStyles}>
          <Button color="secondary" variant="text" onClick={() => setOpen(!open)} sx={headerModalButtonStyles}>
            {open ? 'Close' : 'Search'}
          </Button>
        </Box>

        {open && <Search open={open} />}
      </Paper>

      <Box component={'div'} key={`crud-app-wrapper`} id={`crud-app-wrapper`} sx={crudAppWrapperStyles}>
        <Paper key={'crud-paper-wrapper'} id="crud-paper-wrapper" sx={crudPaperSxProps}>
          {pathname === '/crud' && <CrudHome />}
          <Box
            component={'div'}
            key={'data-grid-grids-wrapper'}
            id="data-grid-grids-wrapper"
            sx={crudDataGridGridsSxProps}
          >
            <Box key={'crud-outlet-wrapper'} id={'crud-outlet-wrapper'}>
              <Outlet />
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Crud;
