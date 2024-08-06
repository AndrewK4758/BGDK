import { SxProps } from '@mui/material';
import JoinGame from '../forms/join-game/join-game';
import Text from '../text/text';
import ChatInput from '../../vertex-components/chat-input/chat-input';


/* eslint-disable-next-line */
export interface HomeProps {
  breakpointsHomeTextTitle?: SxProps;
  breakpointsHomeText?: SxProps;
  breakpointsJoinGameButton?: SxProps;
  breakpointsJoinGameText?: SxProps;
  breakpointsJoinGameLabel?: SxProps;
  breakpointsChatInputText?: SxProps;
  breakpointsChatResponse?: SxProps;
  response: string | undefined;
}

export const Home = ({
  breakpointsHomeText,
  breakpointsHomeTextTitle,
  breakpointsJoinGameButton,
  breakpointsJoinGameText,
  breakpointsJoinGameLabel,
  breakpointsChatInputText,
  breakpointsChatResponse,
  response,
}: HomeProps) => (
  <>
    <Text titleVariant="h1" titleText="Welcome To My Game" sx={breakpointsHomeTextTitle} />
    <Text
      titleVariant="body1"
      titleText={
        <>
          Click on MENU &#8658; SHOW GAMES to select your title <br /> OR <br /> Enter your link into the box below to
          join active game
        </>
      }
      sx={breakpointsHomeText}
    />
    <JoinGame
      method="patch"
      action="join-game"
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

