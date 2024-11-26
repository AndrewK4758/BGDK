import { Waiting } from '@bgdk/shared-react-components';
import Box from '@mui/material/Box';
import type { SxProps } from '@mui/material/styles';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import WebSocketContextProvider from '../../contexts/websocket-context';
import Home from '../../pages/home/home';
import '../../styles/layout.css';
import Header from '../header/header';
import Menus from '../menus/menus';

const headerWrapperSxProps: SxProps = {
  position: 'fixed',
  top: '1vh',
  width: '55vw',
  display: 'flex',
  height: '8vh',
  maxHeight: '120px',
  justifyContent: 'center',
  alignContent: 'center',
  zIndex: 5,
};

const homeWrapperSxProps: SxProps = {
  flex: '0 1 auto',
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '25vh',
};

const mainWrapperSxProps: SxProps = {
  flex: '1 0 100%',
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '20vh',
  gap: '20vh',
};

const outletWrapperSxProps: SxProps = {
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  height: 'fit-content',
  minHeight: '50vh',
  paddingBottom: '15vh',
};

/**
 *
 * @returns Layout for portfolio app
 */

const Layout = () => (
  <Box component={'div'} key={'app-wrapper'} id="app-wrapper" className="app-wrapper">
    <Box component={'div'} className="background" id="background" />
    <Box component={'div'} className="background-overlay" id="background-overlay" />
    <Box component={'div'} id="header-wrapper" sx={headerWrapperSxProps}>
      <Header />
    </Box>
    <Box component={'main'} key={'main'} id="main-wrapper" sx={mainWrapperSxProps}>
      <Box component={'div'} key={'home-wrapper'} id="home-wrapper" sx={homeWrapperSxProps}>
        <Home />
      </Box>
      <Suspense fallback={<Waiting />}>
        <Box component={'div'} key={'outlet-ref-wrapper'} id="outlet-ref-wrapper" sx={outletWrapperSxProps}>
          <WebSocketContextProvider>
            <Outlet />
          </WebSocketContextProvider>
        </Box>
      </Suspense>
    </Box>
    <Menus />
  </Box>
);

export default Layout;
