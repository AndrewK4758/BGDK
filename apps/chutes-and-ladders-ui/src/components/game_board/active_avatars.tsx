import { Player } from '@bgdk/chutes-and-ladders';
import { PlayersInGame, RenderList, Text, Theme } from '@bgdk/react-components';
import { IRegisterFormValues } from '@bgdk/types-game';
import { Box, SxProps } from '@mui/material';
import Container from '@mui/material/Container';
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
      avatarName={e.avatarName}
    />
  </Fragment>
);

interface ActiveAvatarsProps {
  avatarsInGame: IRegisterFormValues[];
  winner: string | undefined;
}

export default function ActiveAvatars({ avatarsInGame, winner }: ActiveAvatarsProps) {
  return (
    <Container component={'section'} sx={breakpointsActiveGameTitleContainer}>
      <Text titleVariant="h2" titleText="Active Players in Game" sx={breakpointsActiveGameTitleText} />
      {!winner ? (
        <Box sx={breakpointsPlayersInGameBox}>
          <RenderList data={avatarsInGame} listMapCallback={playersInGameMap} />
        </Box>
      ) : (
        <Text titleVariant="h2" titleText={winner} sx={breakpointsActiveGameTitleText} />
      )}
    </Container>
  );
}
