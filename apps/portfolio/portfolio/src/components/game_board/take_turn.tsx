import { Theme } from '@bgdk/react-components';
import { SxProps } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Dispatch } from 'react';
import { Socket } from 'socket.io-client';
import { Action, ActionType } from './socket-reducer';
import getGameInstanceInfo from '../../utils/utils';
import type { GamePlayerValidation } from '@bgdk/types-game';

const breakpointsTakeTurnButton: SxProps = {
  backgroundColor: Theme.palette.info.main,
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '17px',
    width: 130,
    height: 35,
  },
};

interface TakeTurnProps {
  dispatch: Dispatch<Action>;
  socket: Socket;
}

export default function TakeTurn({ dispatch, socket }: TakeTurnProps) {
  const playerIds = JSON.parse(sessionStorage.getItem('playersIds') as string) as string[];

  const handleTakeTurn = async () => {
    const player1 = playerIds[0];
    const player2 = playerIds[1];

    const baseURL = import.meta.env.VITE_GAMES_API_URL;
    const gameInfo = getGameInstanceInfo() as GamePlayerValidation;
    const playerId = player1;
    gameInfo.playerID = playerId;
    const reqHeaders = {
      headers: {
        'current-game': JSON.stringify(gameInfo),
      },
    };

    try {
      const resp = await axios.patch(`${baseURL}/games/Chutes-&-Ladders/take-turn`, {}, reqHeaders);
      console.log(resp.data.turnStatus);
      sessionStorage.setItem('playersIds', JSON.stringify([player2, player1]));
      dispatch({ type: ActionType.TAKE_TURN, socket: socket });
      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  return (
    <Button variant="outlined" type="button" onClick={handleTakeTurn} sx={breakpointsTakeTurnButton}>
      Take Turn
    </Button>
  );
}
