import { Player } from '@aklapper/chutes-and-ladders';
import { IPlayersAndBoard, IRegisterFormValues } from '@aklapper/game-types';
import {
  PlayersInGame,
  RenderList,
  Text,
  Theme,
} from '@aklapper/react-components';
import { SxProps, Box } from '@mui/material';
import Container from '@mui/material/Container';
import { useRouteLoaderData } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

const breakpointsActiveGameTitleContainer: SxProps = {
  flex: '0 1 80%',
  [Theme.breakpoints.down('laptop')]: {
    flex: '1 0 60%',
  },
};

const breakpointsActiveGameTitleText: SxProps = {
  textAlign: 'start',
  flex: '1 0 45%',
  [Theme.breakpoints.down('laptop')]: {
    flex: '1 0 100%',
    fontSize: '1.5rem',
    textAlign: 'center',
  },
};

const breakpointsPlayersInGameBox: SxProps = {
  flex: '1 0 55%',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  height: '100%',
  [Theme.breakpoints.down('laptop')]: {},
};

const breakpointsPlayersBox: SxProps = {
  flex: '1 0 50%',
  display: 'flex',
  flexDirection: 'row',
  [Theme.breakpoints.down('laptop')]: {},
};

const breakpointsPlayersInGameText: SxProps = {
  flex: '0 1 auto',
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '1rem',
  },
};

const playersInGameMap = (e: IRegisterFormValues, i: number, arr: Player[]) => (
  <Fragment key={e.avatarName}>
    <PlayersInGame
      component={'span'}
      id={e.playerName}
      boxSx={breakpointsPlayersBox}
      textSx={{ color: e.avatarColor, ...breakpointsPlayersInGameText }}
      playerVariant="body1"
      playerName={`${e.playerName}: `}
      avatarColor={`${e.avatarColor} `}
      avatarName={e.avatarName}
    />
  </Fragment>
);

export default function ActiveAvatars({
  playersInGame,
}: {
  playersInGame: IRegisterFormValues[];
}) {
  const loader = useRouteLoaderData('gameBoard') as IPlayersAndBoard;

  return (
    <Container component={'section'} sx={breakpointsActiveGameTitleContainer}>
      <Text
        titleVariant="h2"
        titleText="Active Players in Game"
        sx={breakpointsActiveGameTitleText}
      />
      {!loader.winner ? (
        <Box sx={breakpointsPlayersInGameBox}>
          <RenderList data={playersInGame} listMapCallback={playersInGameMap} />
        </Box>
      ) : (
        <Text
          titleVariant="h2"
          titleText={loader.winner}
          sx={breakpointsActiveGameTitleText}
        />
      )}
    </Container>
  );
}
