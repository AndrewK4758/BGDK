// import styles from './home.module.css';
import { SxProps } from '@mui/material';
import JoinGame from '../forms/join-game/join-game';
import Text from '../text/text';

/* eslint-disable-next-line */
export interface HomeProps {
  breakpointsHomeTextTitle?: SxProps;
  breakpointsHomeText?: SxProps;
  breakpointsJoinGameButton?: SxProps;
  breakpointsJoinGameText?: SxProps;
  breakpointsJoinGameLabel?: SxProps;
}

export function Home({
  breakpointsHomeText,
  breakpointsHomeTextTitle,
  breakpointsJoinGameButton,
  breakpointsJoinGameText,
  breakpointsJoinGameLabel,
}: HomeProps) {
  return (
    <>
      <Text
        titleVariant="h1"
        titleText="Welcome To My Game"
        sx={breakpointsHomeTextTitle}
      />
      <Text
        titleVariant="body1"
        titleText={
          <>
            Click on MENU &#8658; SHOW GAMES to select your title <br /> OR{' '}
            <br /> Enter your link into the box below to join active game
          </>
        }
        sx={breakpointsHomeText}
      />
      <JoinGame
        breakpointsJoinGameButton={breakpointsJoinGameButton}
        breakpointsJoinGameText={breakpointsJoinGameText}
        breakpointsJoinGameLabel={breakpointsJoinGameLabel}
      />
    </>
  );
}

export default Home;
