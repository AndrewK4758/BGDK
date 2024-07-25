import { Home, Theme } from '@bgdk/react-components';
import { SxProps } from '@mui/material';

const breakpointsHomeTextTitle: SxProps = {
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '4rem',
  },
};

const breakpointsHomeText: SxProps = {
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '1rem',
  },
};

const breakpointsJoinGameButton: SxProps = {
  backgroundColor: Theme.palette.info.main,
  marginTop: '1rem',
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '17px',
    width: 130,
    height: 35,
  },
};

const breakpointsJoinGameLabel: SxProps = {
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '2rem',
    marginTop: 0,
  },
};

const breakpointsJoinGameText: SxProps = {
  backgroundColor: Theme.palette.info.main,
  width: '30vw',
  justifySelf: 'center',
  alignSelf: 'center',
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '17px',
    textAlign: 'center',
    height: 35,
    width: 230,
  },
};

export default function HomePage() {
  sessionStorage.clear();
  return (
    <Home
      breakpointsHomeText={breakpointsHomeText}
      breakpointsHomeTextTitle={breakpointsHomeTextTitle}
      breakpointsJoinGameButton={breakpointsJoinGameButton}
      breakpointsJoinGameText={breakpointsJoinGameText}
      breakpointsJoinGameLabel={breakpointsJoinGameLabel}
    />
  );
}
