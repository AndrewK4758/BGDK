import Box from '@mui/material/Box';
import type { SxProps } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import '../../styles/layout.css';
import AboutMe from '../about-me/about-me';
import Header from '../header/header';
import Menus from '../home/menus/menus';
import TechStackList from '../home/tech-list/tech-list';
import Intro from '../intro/intro';
import PicutreAndResume from '../intro/picture-resume';

const headerWrapperSxProps: SxProps = {
  flex: '0 1 8%',
  display: 'flex',
  minHeight: 'fit-content',
  maxHeight: '80px',
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
};

const Layout = () => (
  <Box
    component={'div'}
    key={'app-wrapper'}
    id="app-wrapper"
    className="app-wrapper"
    sx={{
      position: 'relative',
      height: '100vh',
      width: '100%',
    }}
  >
    <Box component={'div'} id="header-wrapper" sx={headerWrapperSxProps}>
      <Header />
    </Box>
    <Box component={'main'} key={'main'} id="main-wrapper" sx={mainWrapperSxProps}>
      <Box
        component={'div'}
        key={'home-wrapper'}
        id="home-wrapper"
        sx={{
          flex: '1 0 100%',
          minHeight: 'fit-content',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Box
          component={'div'}
          key={'intro-wrapper'}
          id="intro-wrapper"
          sx={{
            position: 'relative',
            flex: '0 1 80%',
            width: '80%',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '2rem',
            top: '12%',
            border: '5px solid red',
          }}
        >
          <Intro />
          <PicutreAndResume />
        </Box>
        <Box
          component={'div'}
          key={'about-wrapper'}
          id="about-wrapper"
          sx={{
            position: 'relative',
            flex: '0 1 80%',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            // top: '12%',
            border: '5px solid blue',
          }}
        >
          <TechStackList />
          <AboutMe />
        </Box>
      </Box>
    </Box>
    <Box component={'div'} key={'outlet-ref-wrapper'} id="outlet-ref-wrapper" sx={{ height: 'fit-content' }}>
      <Outlet />
    </Box>
    <Menus />
  </Box>
);

export default Layout;
