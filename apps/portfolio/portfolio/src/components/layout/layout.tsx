import Box from '@mui/material/Box';
import { Fragment } from 'react';
import Header from '../header/header';
import Home from '../../pages/home/home-page';
import Menus from '../home/menus/menus';
import Footer from '../footer/footer';
import type { SxProps } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import '../../styles/layout.css';

const headerWrapperSxProps: SxProps = {
  flex: '0 1 8%',
  maxHeight: '60px',
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
};

const mainWrapperSxProps: SxProps = {
  position: 'relative',
  flex: '1 0 84%',
  width: '100%',
  minHeight: 'fit-content',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  border: '5px solid blue',
};

const footerWrapperSxProps: SxProps = {
  flex: '0 1 8%',
  maxHeight: '60px',
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'center',
};

const Layout = () => (
  <Fragment>
    <Box component={'header'} key={'header'} id="header" position={'static'} sx={headerWrapperSxProps}>
      <Header />
    </Box>
    <Box component={'main'} key={'main'} id="main-wrapper" sx={mainWrapperSxProps}>
      <Box
        component={'div'}
        key={'home-wrapper'}
        id="home-wrapper"
        sx={{
          flex: '1 0 auto',
          minHeight: 'fit-content',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          border: '5px solid red',
        }}
      >
        <Home />
      </Box>
      <Box component={'div'} key={'outlet-ref-wrapper'} id="outlet-ref-wrapper" sx={{ height: 'fit-content' }}>
        <Outlet />
      </Box>
    </Box>
    <Box component={'footer'} key={'footer'} id="footer-wrapper" sx={footerWrapperSxProps}>
      <Footer />
    </Box>
    <Menus />
  </Fragment>
);

export default Layout;
