import { Home, Theme } from '@aklapper/react-components';
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
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '17px',
    width: 130,
    height: 35,
  },
};
const breakpointsJoinGameText: SxProps = {
  backgroundColor: Theme.palette.info.main,
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '17px',
    textAlign: 'center',
    height: 35,
    width: 230,
  },
};

export default function HomePage() {
  return (
    <Home
      breakpointsHomeText={breakpointsHomeText}
      breakpointsHomeTextTitle={breakpointsHomeTextTitle}
      breakpointsJoinGameButton={breakpointsJoinGameButton}
      breakpointsJoinGameText={breakpointsJoinGameText}
    />
  );
}
