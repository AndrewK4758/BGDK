import { Theme } from '@bgdk/react-components';
import { SxProps } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Dispatch } from 'react';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { Action, ActionType } from './socket-reducer';
import getGameInstanceInfo from '../../services/utils/utils';

const breakpointsResetGameButton: SxProps = {
  marginLeft: '.5rem',
  backgroundColor: Theme.palette.info.main,
  [Theme.breakpoints.down('md')]: {
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
    const reqHeaders = {
      headers: {
        'current-game': JSON.stringify(getGameInstanceInfo()),
        Authorization: sessionStorage.getItem('token'),
      },
    };
    try {
      await axios.patch(`${__baseURL__}/games/${id}/reset`, {}, reqHeaders);
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
