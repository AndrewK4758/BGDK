import Theme from '../../styles/theme';
import { SxProps } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Dispatch } from 'react';
import { Socket } from 'socket.io-client';
import { Action, ActionType } from './socket-reducer';
import getGameInstanceInfo from '../../utils/utils';
import type { GamePlayerValidation } from '@bgdk/types-game';

const breakpointsTakeTurnButton: SxProps = {
  backgroundColor: Theme.palette.primary.main,
  fontSize: '1.25rem',
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '17px',
    width: 130,
    height: 35,
  },
};

const baseURL = import.meta.env.VITE_GAMES_API_URL;

interface TakeTurnProps {
  dispatch: Dispatch<Action>;
  socket: Socket;
  avatarInTurn: string;
}

export default function TakeTurn({ dispatch, socket, avatarInTurn }: TakeTurnProps) {
  const handleTakeTurn = async () => {
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
      const resp = await axios.patch(`${baseURL}/games/Chutes-&-Ladders/take-turn`, {}, reqHeaders);
      console.log(resp.data.turnStatus);
      dispatch({ type: ActionType.TAKE_TURN, socket: socket });
      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  return (
    <Button variant="contained" type="button" onClick={handleTakeTurn} sx={breakpointsTakeTurnButton}>
      Take Turn
    </Button>
  );
}
