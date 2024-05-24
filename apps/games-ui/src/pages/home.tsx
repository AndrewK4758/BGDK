import { JoinGame, Text } from '@aklapper/react-components';

export default function Home() {
  return (
    <>
      <Text titleVariant="h1" titleText="Welcome To My Game" />
      <Text
        titleVariant="body1"
        titleText={
          <>
            Click on MENU &#8658; SHOW GAMES to select your title <br /> OR <br /> Enter your link into the box below to
            join active game
          </>
        }
      />
      <JoinGame />
    </>
  );
}
