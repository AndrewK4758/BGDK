import { Footer, Header, Main } from '@aklapper/react-components';
import { SxProps } from '@mui/material';
import { Theme } from '@aklapper/react-components';

const breakpointsAppBar: SxProps = {
  paddingX: '1rem',
  display: 'flex',
  flexDirection: 'row',
  position: 'fixed',
  zIndex: 10,
  backgroundColor: Theme.palette.background.paper,
  boxShadow: `0px 7px 8px -4px ${Theme.palette.success.main}, 0px 12px 17px 2px ${Theme.palette.primary.light}, 0px 5px 22px 4px ${Theme.palette.primary.dark}`,
  [Theme.breakpoints.down('laptop')]: {
    height: '35px',
    bottom: 0,
    top: 'calc(100vh - 95px)',
    boxShadow: `0px -7px 8px -4px ${Theme.palette.success.main}, 0px -12px 17px 2px ${Theme.palette.primary.light}, 0px -5px 22px 4px ${Theme.palette.primary.dark}`,
  },
  [Theme.breakpoints.up('laptop')]: {
    height: '65px',
    top: 0,
  },
};

const breakpointsText: SxProps = {
  flex: '1 0 auto',
  textAlign: 'end',
  alignSelf: 'center',
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '2rem',
  },
};

const breakpointsFooter: SxProps = {
  position: 'fixed',
  top: 'calc(100vh - 65px)',
  bottom: 0,
  right: 0,
  left: 0,
  textAlign: 'center',
  alignContent: 'center',
  zIndex: 10,
  [Theme.breakpoints.down('laptop')]: {
    display: 'none',
  },
};

const breakpointsFooterText: SxProps = {
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '1.25rem',
  },
};

const breakpointsMain: SxProps = {
  textAlign: 'center',
  position: 'fixed',
  top: 65,
  bottom: 65,
  left: 0,
  right: 0,
  backgroundColor: Theme.palette.background.default,
  zIndex: 9,
  paddingY: '55px',
  [Theme.breakpoints.down('laptop')]: {
    top: 0,
    bottom: 115,
    paddingY: 0,
  },
};

export default function Layout() {
  return (
    <>
      <Header
        component={'header'}
        titleText={'Games App'}
        headerTextVariant={'h2'}
        sxAppBar={breakpointsAppBar}
        sxText={breakpointsText}
      />
      <Main
        component={'main'}
        maxWidth={false}
        breakpointsMain={breakpointsMain}
      />
      <Footer
        component={'footer'}
        breakpointsFooter={breakpointsFooter}
        breakpointsFooterText={breakpointsFooterText}
      />
    </>
  );
}
