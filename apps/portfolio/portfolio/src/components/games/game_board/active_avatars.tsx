import { Player } from '@bgdk/games-components-logic';
import { PlayersInGame, RenderList, Text, Theme } from '@bgdk/react-components';
import { IRegisterFormValues } from '@bgdk/types-game';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import type { SxProps } from '@mui/material/styles';

const activeGameHeaderBoxStyles: SxProps = { display: 'flex', flex: '1 0 100%', justifyContent: 'space-evenly' };

const breakpointsActiveGameTitleContainer: SxProps = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: 4,
  [Theme.breakpoints.down('laptop')]: {
    flex: '1 0 60%',
  },
};

const breakpointsActiveGameTitleText: SxProps = {
  textAlign: 'left',
  flex: '0 1 35%',
  [Theme.breakpoints.down('laptop')]: {
    flex: '1 0 100%',
    fontSize: '1.5rem',
    textAlign: 'center',
  },
};

const breakpointsPlayersInGameBox: SxProps = {
  flex: '0 1 65%',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  height: '100%',
  [Theme.breakpoints.down('laptop')]: {},
};

const breakpointsPlayersBox: SxProps = {
  flex: '0 1 auto',
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
  <PlayersInGame
    key={e.avatarName}
    component={'span'}
    id={e.playerName}
    boxSx={breakpointsPlayersBox}
    textSx={{ color: '#cb91ff', ...breakpointsPlayersInGameText }}
    playerVariant="h4"
    playerName={`${e.playerName}: `}
    avatarName={e.avatarName}
  />
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
    <Container component={'section'} maxWidth={false} sx={breakpointsActiveGameTitleContainer}>
      {!winner ? (
        <Box component={'section'} key={'active-game-header'} id={'active-game-header'} sx={activeGameHeaderBoxStyles}>
          <Box
            component={'section'}
            key={'active-game-header-text-box'}
            id={'active-game-header-text-box'}
            alignContent={'center'}
          >
            <Text titleVariant="h2" titleText="Active Players in Game" sx={breakpointsActiveGameTitleText} />
          </Box>
          <Box component={'section'} sx={breakpointsPlayersInGameBox}>
            <RenderList data={avatarsInGame} listMapCallback={playersInGameMap} sx={activeGameHeaderBoxStyles} />
          </Box>
        </Box>
      ) : (
        <Box component={'section'} sx={{ flex: '1 0 70%' }}>
          <Text titleVariant="h2" titleText={winner} sx={breakpointsActiveGameTitleText} />
        </Box>
      )}
    </Container>
  );
}
