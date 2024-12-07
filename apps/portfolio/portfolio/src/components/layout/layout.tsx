import Box from '@mui/material/Box';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import WebSocketContextProvider from '../../contexts/websocket-context';
import Home from '../../pages/home/home';
import {
  footerWrapperSxProps,
  headerWrapperSxProps,
  homeWrapperSxProps,
  mainWrapperSxProps,
  outletWrapperSxProps,
} from '../../styles/layout-styles';
import '../../styles/layout.css';
import Header from '../header/header';
import Menus from '../menus/menus';

/**
 *
 * @returns Layout for portfolio app
 */

const Layout = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Box component={'div'} key={'app-wrapper'} id="app-wrapper" data-testid="app-wrapper" className="app-wrapper">
      <Box component={'div'} className="background" id="background" data-testid="background" />
      <Box component={'div'} className="background-overlay" id="background-overlay" data-testid="background-overlay" />
      <Box
        component={'div'}
        key={'header-wrapper'}
        id="header-wrapper"
        data-testid="header-wrapper"
        sx={headerWrapperSxProps}
      >
        <Header />
      </Box>
      <Box component={'main'} key={'main-wrapper'} id="main-wrapper" data-testid="main-wrapper" sx={mainWrapperSxProps}>
        <Box
          component={'div'}
          key={'home-wrapper'}
          id="home-wrapper"
          data-testid="home-wrapper"
          sx={homeWrapperSxProps}
        >
          <Home />
        </Box>
        <WebSocketContextProvider>
          <Box component={'div'} key={'outlet-ref-wrapper'} id="outlet-ref-wrapper" sx={outletWrapperSxProps}>
            <Outlet context={{ loading, setLoading }} />
          </Box>
        </WebSocketContextProvider>
      </Box>
      <Menus loading={loading} setLoading={setLoading} />
      <Box
        component={'div'}
        key={'footer-wrapper'}
        id="footer-wrapper"
        data-testid="footer-wrapper"
        sx={footerWrapperSxProps}
      >
        <Link
          key={'privacy-policy-link'}
          id={'privacy-policy-link'}
          to={'/privacy-policy'}
          rel="noopener noreferrer"
          data-testid={'privacy-policy-link'}
        >
          Privacy Policy
        </Link>
      </Box>
    </Box>
  );
};

export default Layout;
