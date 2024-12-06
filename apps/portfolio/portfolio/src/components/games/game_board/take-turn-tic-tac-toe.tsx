import type { GamePlayerValidation } from '@bgdk/types-game';
import { SxProps } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Dispatch } from 'react';
import { Socket } from 'socket.io-client';
import Theme from '../../../styles/theme';
import getGameInstanceInfo from '../../../utils/utils';
import { Action, ActionType } from './socket-reducer';

const breakpointsTakeTurnButton: SxProps = {
  backgroundColor: Theme.palette.primary.main,

  fontSize: '1.75rem',
  [Theme.breakpoints.down('md')]: {
    fontSize: '17px',
    width: 130,
    height: 35,
  },
};

interface TakeTurnProps {
  dispatch: Dispatch<Action>;
  socket: Socket;
  position: string | undefined;
  avatarInTurn: string;
}

const TakeTurnTicTacToe = ({ dispatch, socket, position, avatarInTurn }: TakeTurnProps) => (
  <Button
    variant="contained"
    type="button"
    onClick={() => handleTakeTurn({ dispatch, socket, position, avatarInTurn })}
    sx={breakpointsTakeTurnButton}
  >
    Take Turn
  </Button>
);

export default TakeTurnTicTacToe;

const baseURL = import.meta.env.VITE_GAMES_API_URL;

const handleTakeTurn = async ({ dispatch, socket, position, avatarInTurn }: TakeTurnProps) => {
  const gameInfo = getGameInstanceInfo() as GamePlayerValidation;
  const playersIds = JSON.parse(sessionStorage.getItem('playersIds') as string);
  const playerId = playersIds[avatarInTurn];
  gameInfo.playerID = playerId;

  const reqHeaders = {
    headers: {
      'current-game': JSON.stringify(gameInfo),
    },
  };

  try {
    const resp = await axios.patch(`${baseURL}/games/Tic-Tac-Toe/take-turn`, { position: position }, reqHeaders);

    console.log(resp.data.turnStatus);
    dispatch({ type: ActionType.TAKE_TURN, socket: socket });

    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};
