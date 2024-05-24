// import styles from './players-in-game.module.css';
import { Box, SxProps } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { ElementType } from 'react';
import Text from '../../text/text';

/* eslint-disable-next-line */
export interface PlayersInGameProps {
  component: ElementType;
  id: string | number;
  sx?: SxProps;
  playerVariant: Variant;
  playerName: string;
  avatarColor: string;
  avatarName: string;
}

export function PlayersInGame({
  component,
  id,
  sx,
  playerVariant,
  playerName,
  avatarColor,
  avatarName,
}: PlayersInGameProps) {
  return (
    <Box
      component={component}
      key={id}
      width={'100%'}
      whiteSpace={'preserve'}
      sx={{ display: 'flex', paddingX: '1.5rem' }}
    >
      <Text titleVariant={playerVariant} titleText={playerName} sx={{ flex: '0 1 auto' }} />
      <Text titleVariant={playerVariant} titleText={avatarColor} sx={sx} />
      <Text titleVariant={playerVariant} titleText={avatarName} sx={{ flex: '0 1 auto' }} />
    </Box>
  );
}

export default PlayersInGame;
