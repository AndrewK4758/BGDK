import { Player } from '@bgdk/games-components-logic';
import { PlayersInGame, RenderList, Text, Theme } from '@bgdk/react-components';
import { IRegisterFormValues } from '@bgdk/types-game';
import { Box, SxProps } from '@mui/material';
import { Fragment } from 'react/jsx-runtime';

const breakpointsActiveGameTitleContainer: SxProps = {
  display: 'flex',
  flex: '0 1 90%',
  alignItems: 'center',
  paddingBottom: 4,
  [Theme.breakpoints.down('laptop')]: {
    flex: '1 0 60%',
  },
};

const breakpointsActiveGameTitleText: SxProps = {
  textAlign: 'center',
  flex: '0 1 50%',
  [Theme.breakpoints.down('laptop')]: {
    flex: '1 0 100%',
    fontSize: '1.5rem',
    textAlign: 'center',
  },
};

const breakpointsPlayersInGameBox: SxProps = {
  flex: '1 0 70%',
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

/**
 *
 * @param e Player
 * @param _i index of player array
 * @param _arr Player array
 * @returns an active player/avatar in in the active avatar list
 */

const playersInGameMap = (e: IRegisterFormValues, _i: number, _arr: Player[]) => (
  <Fragment key={e.avatarName}>
    <PlayersInGame
      component={'span'}
      id={e.playerName}
      boxSx={breakpointsPlayersBox}
      textSx={{ color: '#cb91ff', ...breakpointsPlayersInGameText }}
      playerVariant="h4"
      playerName={`${e.playerName}: `}
      avatarName={e.avatarName}
    />
  </Fragment>
);

interface ActiveAvatarsProps {
  avatarsInGame: IRegisterFormValues[];
  winner: string | undefined;
}

/**
 *
 * @param avatarsInGame: Array of avatars in active game
 * @param winner: string showing winning player
 * @returns List of active avatars in game
 */

export default function ActiveAvatars({ avatarsInGame, winner }: ActiveAvatarsProps) {
  return (
    <Box component={'section'} sx={breakpointsActiveGameTitleContainer}>
      {!winner ? (
        <>
          <Text titleVariant="h2" titleText="Active Players in Game" sx={breakpointsActiveGameTitleText} />
          <Box component={'section'} sx={breakpointsPlayersInGameBox}>
            <RenderList data={avatarsInGame} listMapCallback={playersInGameMap} />
          </Box>
        </>
      ) : (
        <Box component={'section'} sx={{ flex: '1 0 70%' }}>
          <Text titleVariant="h2" titleText={winner} sx={breakpointsActiveGameTitleText} />
        </Box>
      )}
    </Box>
  );
}
