import { SxProps } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Dispatch } from 'react';
import { useLocation } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import Theme from '../../../styles/theme';
import getGameInstanceInfo from '../../../utils/utils';
import { Action, ActionType } from './socket-reducer';

const breakpointsResetGameButton: SxProps = {
  marginLeft: '.5rem',
  backgroundColor: Theme.palette.primary.main,
  fontSize: '1.75rem',
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
  const { pathname } = useLocation();
  const temp = pathname.split('/');
  const id = temp[temp.length - 1];

  const handleResetGame = async () => {
    const __baseURL__ = import.meta.env.VITE_GAMES_API_URL;
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
    <Button onClick={handleResetGame} variant="contained" type="button" sx={breakpointsResetGameButton}>
      Reset
    </Button>
  );
}
