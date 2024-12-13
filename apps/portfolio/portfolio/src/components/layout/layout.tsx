import Box from '@mui/material/Box';
import { useState, type JSX } from 'react';
import { Link, Outlet } from 'react-router-dom';
import WebSocketContextProvider from '../../contexts/websocket-context';
import Home from '../../pages/home/home';
import {
  baseStyleForLayoutItems,
  footerWrapperSxProps,
  headerWrapperSxProps,
  homeWrapperSxProps,
  mainWrapperSxProps,
  outletWrapperSxProps
} from '../../styles/layout-styles';
import Header from '../header/header';
import Menus from '../menus/menus';

/**
 * This component renders the main layout of the application.
 * It includes the header, home section, navigation menus, main content area, and footer.
 *
 * @returns {JSX.Element} The rendered Layout component.
 */
const Layout = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Box component={'div'} key={'app-wrapper'} id="app-wrapper" data-testid="app-wrapper" sx={baseStyleForLayoutItems}>
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
