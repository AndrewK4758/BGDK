import { Footer, Header, Main } from '@aklapper/react-components';
import { SxProps } from '@mui/material';
import { Theme } from '@aklapper/react-components';

const breakpointsAppBar: SxProps = {
  paddingX: '1rem',
  display: 'flex',
  flexDirection: 'row',
  position: 'absolute',
  top: 0,
  zIndex: 10,
  backgroundColor: Theme.palette.background.paper,
  boxShadow: `0px 7px 8px -4px ${Theme.palette.success.main}, 0px 12px 17px 2px ${Theme.palette.primary.light}, 0px 5px 22px 4px ${Theme.palette.primary.dark}`,
  [Theme.breakpoints.up('laptop')]: {
    fontSize: '2rem',
    border: '5px solid blue',
  },
};

// const x = (theme) => ({
//   [theme.breakpoints.up('laptop')]: {
//     fontSize: '2rem',
//     border: '5px solid blue',
//   },
// });

const breakpointsText: SxProps = {
  flex: '1 0 auto',
  textAlign: 'end',
  alignSelf: 'center',
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
      <Main component={'main'} maxWidth={false} />
      <Footer />
    </>
  );
}
