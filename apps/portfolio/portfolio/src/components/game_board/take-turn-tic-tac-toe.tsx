import { Theme } from '@bgdk/react-components';
import { SxProps } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Dispatch } from 'react';
import { useLocation } from 'react-router-dom';
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
  position: (EventTarget & HTMLDivElement) | undefined;
}

export default function TakeTurnTicTacToe({ dispatch, socket, position }: TakeTurnProps) {
  const loc = useLocation();

  const url = loc.pathname.split('/');

  const id = url[url.length - 1];

  const playerIds = JSON.parse(sessionStorage.getItem('playersIds') as string);

  const player1 = playerIds[0];
  const player2 = playerIds[1];

  const gameInfo = getGameInstanceInfo() as GamePlayerValidation;
  gameInfo.playerID = player1;

  const __current_game__ = JSON.stringify(gameInfo);

  console.log(position?.textContent, 'out of button');
  const handleTakeTurn = async () => {
    const baseURL = import.meta.env.VITE_GAMES_API_URL;
    console.log(position, 'in button');
    try {
      const resp = await axios.patch(
        `${baseURL}/games/${id}/take-turn`,
        { position: position?.textContent },
        { headers: { 'current-game': __current_game__ } },
      );
      console.log(resp.data.turnStatus);
      dispatch({ type: ActionType.TAKE_TURN, socket: socket });

      sessionStorage.setItem('playersIds', JSON.stringify([player2, player1]));
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
