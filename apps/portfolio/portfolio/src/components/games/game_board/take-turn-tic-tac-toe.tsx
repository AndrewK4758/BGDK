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
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '17px',
    width: 130,
    height: 35,
  },
};

interface TakeTurnProps {
  dispatch: Dispatch<Action>;
  socket: Socket;
  position: (EventTarget & HTMLDivElement) | undefined;
  avatarInTurn: string;
}

export default function TakeTurnTicTacToe({ dispatch, socket, position, avatarInTurn }: TakeTurnProps) {
  const gameInfo = getGameInstanceInfo() as GamePlayerValidation;
  const playersIds = JSON.parse(sessionStorage.getItem('playersIds') as string);
  const playerId = playersIds[avatarInTurn];
  gameInfo.playerID = playerId;
  const reqHeaders = {
    headers: {
      'current-game': JSON.stringify(gameInfo),
    },
  };

  console.log(position?.textContent, 'out of button');
  const handleTakeTurn = async () => {
    const baseURL = import.meta.env.VITE_GAMES_API_URL;
    console.log(position, 'in button');
    try {
      const resp = await axios.patch(
        `${baseURL}/games/Tic-Tac-Toe/take-turn`,
        { position: position?.textContent },
        reqHeaders,
      );
      console.log(resp.data.turnStatus);
      dispatch({ type: ActionType.TAKE_TURN, socket: socket });
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
