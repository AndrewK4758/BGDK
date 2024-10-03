import { Waiting } from '@bgdk/shared-react-components';
import Box from '@mui/material/Box';
import type { SxProps } from '@mui/material/styles';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import '../../styles/layout.css';
import Header from '../header/header';
import Intro from '../intro/intro';
import PicutreAndResume from '../intro/picture-resume';
import Menus from '../menus/menus';
import TechStackList from '../tech-list/tech-list';
import GameContextProvider from '../../contexts/contexts';

const headerWrapperSxProps: SxProps = {
  position: 'fixed',
  top: '1vh',
  width: '70%',
  display: 'flex',
  height: '8vh',
  maxHeight: '120px',
  justifyContent: 'center',
  alignContent: 'center',
  zIndex: 5,
};

const mainWrapperSxProps: SxProps = {
  flex: '1 0 100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '30vh',
  gap: '25vh',
};

const Layout = () => (
  <Box component={'div'} key={'app-wrapper'} id="app-wrapper" className="app-wrapper">
    <Box component={'div'} className="background" />
    <Box component={'div'} className="background-overlay" />
    <Box component={'div'} id="header-wrapper" sx={headerWrapperSxProps}>
      <Header />
    </Box>
    <Box component={'main'} key={'main'} id="main-wrapper" sx={mainWrapperSxProps}>
      <Box
        component={'div'}
        key={'intro-wrapper'}
        id="intro-wrapper"
        sx={{
          flex: '0 1 auto',
          width: '90%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Intro />

        <PicutreAndResume />
      </Box>
      <Box
        component={'div'}
        key={'tech-stack-wrapper'}
        id="tech-stack-wrapper"
        sx={{
          width: '90%',
          display: 'flex',

          justifyContent: 'center',
        }}
      >
        <TechStackList />
      </Box>
      <Box
        component={'div'}
        key={'outlet-ref-wrapper'}
        id="outlet-ref-wrapper"
        sx={{
          width: '100%',
          display: 'flex',
          height: 'fit-content',
          minHeight: '50vh',
        }}
      >
        <GameContextProvider>
          <Suspense fallback={<Waiting />}>
            <Outlet />
          </Suspense>
        </GameContextProvider>
      </Box>
    </Box>
    <Menus />
  </Box>
);

export default Layout;
