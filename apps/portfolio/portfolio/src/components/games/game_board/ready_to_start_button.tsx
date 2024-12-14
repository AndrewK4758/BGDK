import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import axios, { type AxiosRequestConfig } from 'axios';
import { Dispatch, type JSX } from 'react';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { breakpointsStartGameButtonBox, breakpointsStartGameButtonFormButton } from '@bgdk/react-components';
import getGameInstanceInfo from '../../../utils/utils';
import { Action, ActionType } from './socket-reducer';

interface ReadyToStartProps {
  dispatch: Dispatch<Action>;
  socket: Socket;
}

/**
 * This component renders a button that allows users to start a game.
 *
 * @param {ReadyToStartProps} props - The props for the ReadyToStart component.
 * @param {Dispatch<Action>} props.dispatch - A function to dispatch actions to the reducer.
 * @param {Socket} props.socket - The socket.io socket object.
 * @returns {JSX.Element} The rendered ReadyToStart component.
 */

export default function ReadyToStart({ dispatch, socket }: ReadyToStartProps): JSX.Element {
  const { id } = useParams() as { id: string };

  const reqHeaders = {
    headers: {
      'current-game': JSON.stringify(getGameInstanceInfo())
    }
  };

  return (
    <Container component={'section'} sx={breakpointsStartGameButtonBox}>
      <Button
        onClick={() => handleStartGame(dispatch, socket, id, reqHeaders)}
        variant="outlined"
        type="button"
        sx={breakpointsStartGameButtonFormButton}
      >
        Start Game
      </Button>
    </Container>
  );
}

const __baseURL__ = import.meta.env.VITE_REST_API_SERVER_URL;
/**
 * This function handles the start game button click event.
 * It sends a PATCH request to the server to start the game and dispatches an action to update the game state.
 */

/**
 *
 * @param {Dispatch<Action>} dispatch - A function to dispatch actions to the reducer.
 * @param {Socket} socket - The socket.io socket object.
 * @param {string} id - Game name to render
 * @param {AxiosRequestConfig} reqHeaders - Custom header to connect to current game instance on backend
 */

const handleStartGame = async (
  dispatch: Dispatch<Action>,
  socket: Socket,
  id: string,
  reqHeaders: AxiosRequestConfig
) => {
  const resp = await axios.patch(`${__baseURL__}/games/${id}/start`, {}, reqHeaders);
  dispatch({ type: ActionType.START, socket: socket });
  console.log(resp.data.message);
};
