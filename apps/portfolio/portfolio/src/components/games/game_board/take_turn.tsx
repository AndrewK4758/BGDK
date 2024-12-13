import type { GamePlayerValidation } from '@bgdk/types-game';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Dispatch, type JSX } from 'react';
import { Socket } from 'socket.io-client';
import { breakpointsTakeTurnButton } from '@bgdk/react-components';
import getGameInstanceInfo from '../../../utils/utils';
import { Action, ActionType } from './socket-reducer';

const baseURL = import.meta.env.VITE_GAMES_API_URL;

interface TakeTurnProps {
  dispatch: Dispatch<Action>;
  socket: Socket;
  avatarInTurn: string;
}

/**
 * This component renders a button that allows users to take their turn in a game.
 *
 * @param {TakeTurnProps} props - The props for the TakeTurn component.
 * @param {Dispatch<Action>} props.dispatch - A function to dispatch actions to the reducer.
 * @param {Socket} props.socket - The socket.io socket object.
 * @param {string} props.avatarInTurn - The avatar of the player whose turn it is.
 * @returns {JSX.Element} The rendered TakeTurn component.
 */

export default function TakeTurn({ dispatch, socket, avatarInTurn }: TakeTurnProps): JSX.Element {
  return (
    <Button
      variant="contained"
      type="button"
      onClick={() => handleTakeTurn(dispatch, socket, avatarInTurn)}
      sx={breakpointsTakeTurnButton}
    >
      Take Turn
    </Button>
  );
}

/**
 * This function handles the take turn button click event.
 * It sends a PATCH request to the server to take the turn and dispatches an action to update the game state.
 *
 * @param {Dispatch<Action>} dispatch - A function to dispatch actions to the reducer.
 * @param {Socket} socket - The socket.io socket object.
 * @param {string} avatarInTurn - The avatar of the player whose turn it is.
 * @returns null
 */
const handleTakeTurn = async (dispatch: Dispatch<Action>, socket: Socket, avatarInTurn: string) => {
  try {
    const gameInfo = getGameInstanceInfo() as GamePlayerValidation;
    const playersIds = JSON.parse(sessionStorage.getItem('playersIds') as string);
    const playerId = playersIds[avatarInTurn];
    gameInfo.playerID = playerId;
    const reqHeaders = {
      headers: {
        'current-game': JSON.stringify(gameInfo)
      }
    };

    const resp = await axios.patch(`${baseURL}/games/Chutes-&-Ladders/take-turn`, {}, reqHeaders);
    console.log(resp.data.turnStatus);
    return null;
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    dispatch({ type: ActionType.TAKE_TURN, socket: socket });
  }
};
