import { Footer, Header, Main, GamesTheme as Theme } from '@bgdk/react-components';
import type { SxProps } from '@mui/material/styles';
import { Fragment } from 'react';

const breakpointsAppBar: SxProps = {
  paddingX: '1rem',
  display: 'flex',
  flexDirection: 'row',
  position: 'fixed',
  zIndex: 10,
  backgroundColor: Theme.palette.background.paper,
  boxShadow: `0px 7px 8px -4px ${Theme.palette.success.main}, 0px 12px 17px 2px ${Theme.palette.primary.light}, 0px 5px 22px 4px ${Theme.palette.primary.dark}`,
  [Theme.breakpoints.down('md')]: {
    height: '35px',
    bottom: 0,
    top: 'calc(100vh - 100px)',
    boxShadow: `0px -7px 8px -4px ${Theme.palette.success.main}, 0px -12px 17px 2px ${Theme.palette.primary.light}, 0px -5px 22px 4px ${Theme.palette.primary.dark}`
  },
  [Theme.breakpoints.up('md')]: {
    height: '65px',
    top: 0
  }
};

const breakpointsText: SxProps = {
  flex: '1 0 auto',
  textAlign: 'center',
  alignSelf: 'center',
  textDecoration: 'none',
  display: 'flex',
  height: '65px',
  color: Theme.palette.primary.main,
  [Theme.breakpoints.down('md')]: {
    fontSize: '2rem'
  }
};

const breakpointsFooter: SxProps = {
  position: 'fixed',
  bottom: 0,
  right: 0,
  left: 0,
  textAlign: 'center',
  alignContent: 'center',
  zIndex: 10,
  [Theme.breakpoints.down('md')]: {
    display: 'none'
  }
};

const breakpointsFooterText: SxProps = {
  [Theme.breakpoints.down('md')]: {
    fontSize: '1.25rem'
  }
};

const breakpointsMain: SxProps = {
  textAlign: 'center',
  position: 'relative',
  backgroundColor: Theme.palette.background.default,
  zIndex: 9,
  paddingY: '10vh',
  height: 'fit-content',
  minHeight: '100vh',
  overflowY: 'hidden',
  [Theme.breakpoints.down('md')]: {
    top: 0,
    bottom: 100,
    paddingY: 0
  }
};

const Layout = () => (
  <Fragment key={'Layout'}>
    <Header
      componentAppBar={'header'}
      componentLogin={'div'}
      componentRegister={'div'}
      sxAppBar={breakpointsAppBar}
      sxText={breakpointsText}
    />
    <Main component={'main'} id={'main-container'} maxWidth={false} breakpointsMain={breakpointsMain} />
    <Footer component={'footer'} breakpointsFooter={breakpointsFooter} breakpointsFooterText={breakpointsFooterText} />
  </Fragment>
);

export default Layout;
