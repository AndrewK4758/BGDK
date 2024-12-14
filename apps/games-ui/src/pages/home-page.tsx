import { GamesTheme as Theme, JoinGame } from '@bgdk/react-components';
import { Text } from '@bgdk/shared-react-components';
import type { SxProps } from '@mui/material/styles';

const breakpointsHomeTextTitle: SxProps = {
  ['min-width:900px']: {
    fontSize: '4rem'
  }
};

const breakpointsHomeText: SxProps = {
  ['min-width:900px']: {
    fontSize: '1rem'
  }
};

const breakpointsJoinGameButton: SxProps = {
  backgroundColor: Theme.palette.info.main,
  marginTop: '1rem',
  ['min-width:900px']: {
    fontSize: '17px',
    width: 130,
    height: 35
  }
};

const breakpointsJoinGameLabel: SxProps = {
  m: 0,
  marginBottom: 1,
  ['min-width:900px']: {
    fontSize: '2rem',
    marginTop: 0
  }
};

const breakpointsJoinGameText: SxProps = {
  backgroundColor: Theme.palette.info.main,
  width: '30vw',
  justifySelf: 'center',
  alignSelf: 'center',
  ['min-width:900px']: {
    fontSize: '17px',
    textAlign: 'center',
    height: 35,
    width: 230
  }
};

// const breakpointsChatInputText: SxProps = {
//   backgroundColor: Theme.palette.info.main,
//   width: '80vw',
//   justifySelf: 'center',
//   alignSelf: 'center',
//   ['min-width:900px']: {
//     fontSize: '17px',
//     textAlign: 'center',
//     height: 35,
//     width: 230,
//   },
// };

// const breakpointsChatResponse: SxProps = {
//   backgroundColor: Theme.palette.info.main,
//   width: '100%',
//   minHeight: 'fit-content',
//   borderRadius: '15px',
//   justifyContent: 'center',
//   alignContent: 'center',
//   color: Theme.palette.primary.main,
//   border: `5px solid ${Theme.palette.success.main}`,
//   boxShadow: Theme.shadows[14],
//   ['min-width:900px']: {
//     fontSize: '17px',
//     textAlign: 'center',
//   },
// };

const Home = () => (
  <>
    <Text component={'h1'} titleVariant="h1" titleText="Welcome To My Game" sx={breakpointsHomeTextTitle} />
    <Text
      component={'p'}
      titleVariant="body1"
      titleText={
        <>
          Login or Register to enjoy the best experience. <br /> THEN <br /> Click on MENU &#8658; SHOW GAMES to select
          your title <br /> OR <br /> Enter your link into the box below to join active game
        </>
      }
      sx={breakpointsHomeText}
    />
    <JoinGame
      method="patch"
      type="text"
      buttonText="Join Game"
      buttonType="submit"
      variant="outlined"
      breakpointsJoinGameButton={breakpointsJoinGameButton}
      breakpointsJoinGameText={breakpointsJoinGameText}
      breakpointsJoinGameLabel={breakpointsJoinGameLabel}
      names={['gamePath']}
    />
  </>
);

export default Home;
