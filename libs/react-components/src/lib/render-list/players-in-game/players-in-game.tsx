// import styles from './players-in-game.module.css';
import { Box, SxProps } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { ElementType } from 'react';
import Text from '../../text/text';

/* eslint-disable-next-line */
export interface PlayersInGameProps {
  component: ElementType;
  id: string | number;
  boxSx?: SxProps;
  textSx: SxProps;
  playerVariant: Variant;
  playerName: string;
  avatarColor: string;
  avatarName: string;
}

export function PlayersInGame({
  component,
  id,
  boxSx,
  textSx,
  playerVariant,
  playerName,
  avatarColor,
  avatarName,
}: PlayersInGameProps) {
  return (
    <Box
      component={component}
      key={id}
      width={'fit-content'}
      whiteSpace={'preserve'}
      sx={boxSx}
    >
      <Text titleVariant={playerVariant} titleText={playerName} sx={textSx} />
      <Text titleVariant={playerVariant} titleText={avatarColor} sx={textSx} />
      <Text titleVariant={playerVariant} titleText={avatarName} sx={textSx} />
    </Box>
  );
}

export default PlayersInGame;
