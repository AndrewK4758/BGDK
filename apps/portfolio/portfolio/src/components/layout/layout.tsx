import Box from '@mui/material/Box';
import { Fragment, useState } from 'react';
import Header from '../header/header';
import Home from '../../pages/home/home-page';
import Menus from '../home/menus/menus';
import Footer from '../footer/footer';
import type { SxProps } from '@mui/material/styles';
import EmailDialog from '../email/email-dialog';

const headerWrapperSxProps: SxProps = {
  position: 'static',
  flex: '0 1 15%',
  maxHeight: '150px',
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
};

const mainWrapperSxProps: SxProps = {
  position: 'relative',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  flex: '2 0 67%',
  maxHeight: 'fit-content',
  width: '100%',
};

const footerWrapperSxProps: SxProps = {
  position: 'static',
  flex: '0 1 15%',
  maxHeight: '150px',
  bottom: 0,
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'center',
};

const Layout = () => {
  const [openEmail, setOpenEmail] = useState<boolean>(false);
  return (
    <Fragment>
      <Box component={'header'} key={'header'} id="header" position={'static'} sx={headerWrapperSxProps}>
        <Header />
      </Box>
      <Box component={'main'} key={'main'} id="main-wrapper" sx={mainWrapperSxProps}>
        <Home openEmail={openEmail} />
      </Box>
      <Box component={'footer'} key={'footer'} id="footer-wrapper" sx={footerWrapperSxProps}>
        <Footer setOpenEmail={setOpenEmail} />
      </Box>
      <>
        <Menus />
        <Box component={'div'} className="main-wrapper-background" />
        <Box component={'div'} key={'email-form-wrapper'} id="email-form-wrapper" width={'100%'}>
          <EmailDialog open={openEmail} setOpen={setOpenEmail} />
        </Box>
      </>
    </Fragment>
  );
};

export default Layout;
