// import styles from './players-in-game.module.css';
import { Box, SxProps } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { CSSProperties, ElementType } from 'react';
import Text from '../../text/text.tsx';

const avatarSvgStyle: CSSProperties = {
  height: 'auto',
  width: '30%',
};

/* eslint-disable-next-line */
export interface PlayersInGameProps {
  component: ElementType;
  id: string | number;
  boxSx?: SxProps;
  textSx: SxProps;
  playerVariant: Variant;
  playerName: string;
  avatarName: string;
}

/**
 *
 * @param param0 Params needed to populate the list of players in game with avatars
 * @returns list of players in game with avatars
 */

export function PlayersInGame({
  component,
  id,
  boxSx,
  textSx,
  playerVariant,
  playerName,
  avatarName,
}: PlayersInGameProps) {
  const avatarSVG = `./game-avatars/${avatarName.toLowerCase()}.svg`;
  return (
    <Box component={component} key={id} width={'fit-content'} whiteSpace={'preserve'} sx={boxSx}>
      <Text titleVariant={playerVariant} titleText={playerName} sx={textSx} />
      <img src={avatarSVG} alt={`${avatarName} active in game`} style={avatarSvgStyle} />
    </Box>
  );
}

export default PlayersInGame;
