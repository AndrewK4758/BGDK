import { Theme } from '@bgdk/react-components';
import { SxProps } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Dispatch } from 'react';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { Action, ActionType } from '../../hooks/socket-reducer';
import { getGameInstanceInfo } from '../../services/utils/utils';

const breakpointsResetGameButton: SxProps = {
  marginLeft: '.5rem',
  backgroundColor: Theme.palette.info.main,
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '17px',
    width: 130,
    height: 35,
  },
};

interface ResetGameProps {
  dispatch: Dispatch<Action>;
  socket: Socket;
}

export default function ResetGame({ dispatch, socket }: ResetGameProps) {
  const params = useParams();
  const id = params.id;

  const handleResetGame = async () => {
    const __baseURL__ = import.meta.env.VITE_REST_API_SERVER_URL;
    const __current_game__ = JSON.stringify(getGameInstanceInfo());
    try {
      await axios.patch(`${__baseURL__}/games/${id}/reset`, {}, { headers: { 'current-game': __current_game__ } });
      dispatch({ type: ActionType.RESET, socket: socket });
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return (
    <Button onClick={handleResetGame} variant="outlined" type="button" sx={breakpointsResetGameButton}>
      Reset
    </Button>
  );
}
