import Box from '@mui/material/Box';
import { Fragment } from 'react';
import '../../styles/layout.css';
import Header from '../header/header';
import Home from '../home/home-page';
import Menus from '../menus/menus';
import Footer from '../footer/footer';

const Layout = () => {
  return (
    <Fragment>
      <Box component={'div'} className="main-wrapper-background" key={'app-wrapper'} />
      <Header />
      <Box
        component={'main'}
        key={'main'}
        id="main-wrapper"
        sx={{
          position: 'static',
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'column',
          flex: '1 0 64%',
          width: '100%',
          paddingY: '2%',
        }}
      >
        <Home />
      </Box>
      <Box
        component={'footer'}
        key={'footer'}
        id="footer-wrapper"
        sx={{
          position: 'static',
          flex: '0 1 18%',
          bottom: 0,
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        <Footer />
      </Box>
      <Menus />
    </Fragment>
  );
};

export default Layout;
