import { Player } from '@aklapper/chutes-and-ladders';
import { IPlayersAndBoard, IRegisterFormValues } from '@aklapper/model';
import { PlayersInGame, RenderList, Text } from '@aklapper/react-components';
import Container from '@mui/material/Container';
import { useRouteLoaderData } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

const playersInGameMap = (e: IRegisterFormValues, i: number, arr: Player[]) => (
  <Fragment key={e.avatarName}>
    <PlayersInGame
      component={'span'}
      id={e.playerName}
      sx={{ color: `${e.avatarColor}`, flex: '0 1 auto', justifyContent: 'center', alignContent: 'center' }}
      playerVariant="body1"
      playerName={`${e.playerName} playing with a `}
      avatarColor={`${e.avatarColor} `}
      avatarName={e.avatarName}
    />
  </Fragment>
);

export default function ActiveAvatars({ playersInGame }: { playersInGame: IRegisterFormValues[] }) {
  const loader = useRouteLoaderData('gameBoard') as IPlayersAndBoard;

  return (
    <Container component={'section'} sx={{ width: '70%', flex: '1 0 70' }}>
      <Text titleVariant="h2" titleText="Active Players in Game" sx={{ textAlign: 'start' }} />
      {!loader.winner ? (
        <RenderList data={playersInGame} listMapCallback={playersInGameMap} />
      ) : (
        <Text titleVariant="h2" titleText={loader.winner} />
      )}
    </Container>
  );
}
