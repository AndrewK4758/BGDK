import { Theme, JoinGame, Text, ChatInput } from '@bgdk/react-components';
import { useActionData } from 'react-router-dom';
import type { SxProps } from '@mui/material/styles';

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
  m: 0,
  marginBottom: 1,
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

const breakpointsChatInputText: SxProps = {
  backgroundColor: Theme.palette.info.main,
  width: '80vw',
  justifySelf: 'center',
  alignSelf: 'center',
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '17px',
    textAlign: 'center',
    height: 35,
    width: 230,
  },
};

const breakpointsChatResponse: SxProps = {
  backgroundColor: Theme.palette.info.main,
  width: '100%',
  minHeight: 'fit-content',
  borderRadius: '15px',
  justifyContent: 'center',
  alignContent: 'center',
  color: Theme.palette.primary.main,
  border: `5px solid ${Theme.palette.success.main}`,
  boxShadow: Theme.shadows[14],
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '17px',
    textAlign: 'center',
  },
};

const Home = () => {
  const response = useActionData() as string;
  return (
    <>
      <Text titleVariant="h1" titleText="Welcome To My Game" sx={breakpointsHomeTextTitle} />
      <Text
        titleVariant="body1"
        titleText={
          <>
            Login or Register to enjoy the best experience. <br /> THEN <br /> Click on MENU &#8658; SHOW GAMES to
            select your title <br /> OR <br /> Enter your link into the box below to join active game
          </>
        }
        sx={breakpointsHomeText}
      />
      <JoinGame
        method="patch"
        type="text"
        buttonText="Join Game"
        buttonType="submit"
        name="gamePath"
        variant="outlined"
        breakpointsJoinGameButton={breakpointsJoinGameButton}
        breakpointsJoinGameText={breakpointsJoinGameText}
        breakpointsJoinGameLabel={breakpointsJoinGameLabel}
      />
      <br />
      <Text titleVariant="body1" titleText={response} sx={breakpointsChatResponse} />
      <ChatInput
        method="post"
        action="/?index"
        type="text"
        buttonText="Ask Astro"
        buttonType="submit"
        name="promptInput"
        variant="outlined"
        breakpointsChatInputButton={breakpointsJoinGameButton}
        breakpointsChatInputLabel={breakpointsJoinGameLabel}
        breakpointsChatInputText={breakpointsChatInputText}
      />
    </>
  );
};

export default Home;
