import type { GamePlayerValidation } from '@bgdk/types-game';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Dispatch } from 'react';
import { Socket } from 'socket.io-client';
import { breakpointsTakeTurnButton } from '../../../styles/games-styles';
import getGameInstanceInfo from '../../../utils/utils';
import { Action, ActionType } from './socket-reducer';

const baseURL = import.meta.env.VITE_GAMES_API_URL;

interface TakeTurnProps {
  dispatch: Dispatch<Action>;
  socket: Socket;
  avatarInTurn: string;
}

/**
 *
 * @param param0 props for taking a turn
 * @returns null
 */

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
