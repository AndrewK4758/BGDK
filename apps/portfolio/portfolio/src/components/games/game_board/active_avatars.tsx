import { Player } from '@bgdk/games-components-logic';
import {
  PlayersInGame,
  activeGameHeaderBoxStyles,
  breakpointsActiveGameTitleContainer,
  breakpointsActiveGameTitleText,
  breakpointsPlayersBox,
  breakpointsPlayersInGameBox,
  breakpointsPlayersInGameText
} from '@bgdk/react-components';
import { RenderList, Text } from '@bgdk/shared-react-components';
import { IRegisterFormValues } from '@bgdk/types-game';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

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
    textSx={{ ...breakpointsPlayersInGameText, color: '#cb91ff' }}
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
            <Text
              component={'h2'}
              titleVariant="h2"
              titleText="Active Players in Game"
              sx={breakpointsActiveGameTitleText}
            />
          </Box>
          <Box component={'section'} sx={breakpointsPlayersInGameBox}>
            <RenderList data={avatarsInGame} listMapCallback={playersInGameMap} sx={activeGameHeaderBoxStyles} />
          </Box>
        </Box>
      ) : (
        <Box component={'section'} sx={{ flex: '1 0 70%' }}>
          <Text component={'h2'} titleVariant="h2" titleText={winner} sx={breakpointsActiveGameTitleText} />
        </Box>
      )}
    </Container>
  );
}
