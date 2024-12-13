import Button from '@mui/material/Button';
import axios from 'axios';
import { Dispatch, type JSX, type SetStateAction } from 'react';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { breakpointsResetGameButton } from '../../../../../../../libs/react-components/src/lib/theme/games-styles';
import getGameInstanceInfo from '../../../utils/utils';
import { Action, ActionType } from './socket-reducer';

interface ResetGameProps {
  dispatch: Dispatch<Action>;
  socket: Socket;
  setSpace: Dispatch<SetStateAction<string | undefined>>;
}

/**
 * This component renders a button that allows users to reset a game.
 *
 * @param {ResetGameProps} props - The props for the ResetGame component.
 * @param {Dispatch<Action>} props.dispatch - A function to dispatch actions to the reducer.
 * @param {Socket} props.socket - The socket.io socket object.
 * @param {Dispatch<SetStateAction<string | undefined>>} props.setSpace - A function to update the selected space on the game board.
 * @returns {JSX.Element} The rendered ResetGame component.
 */

export default function ResetGame({ dispatch, socket, setSpace }: ResetGameProps): JSX.Element {
  const { id } = useParams();

  return (
    <Button
      onClick={() => handleResetGame({ dispatch, socket, setSpace, id })}
      variant="contained"
      type="button"
      sx={breakpointsResetGameButton}
    >
      Reset
    </Button>
  );
}

const baseURL = import.meta.env.VITE_GAMES_API_URL;

/**
 * This function handles the reset game button click event.
 * It sends a PATCH request to the server to reset the game and dispatches an action to update the game state.
 *
 * @param {ResetGameProps & { id: string | undefined }} props - The props for the handleResetGame function.
 */

const handleResetGame = async ({ dispatch, socket, setSpace, id }: ResetGameProps & { id: string | undefined }) => {
  const reqHeaders = {
    headers: {
      'current-game': JSON.stringify(getGameInstanceInfo())
    }
  };
  try {
    await axios.patch(`${baseURL}/games/${id}/reset`, {}, reqHeaders);
    dispatch({ type: ActionType.RESET, socket: socket });
    return null;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    setSpace(undefined);
  }
};
