import { Theme } from '@bgdk/react-components';
import { SxProps } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Dispatch } from 'react';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { Action, ActionType } from './socket-reducer';
import getGameInstanceInfo from '../../services/utils/utils';

const breakpointsTakeTurnButton: SxProps = {
  backgroundColor: Theme.palette.info.main,
  [Theme.breakpoints.down('md')]: {
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
  const params = useParams();
  const id = params.id;

  const handleTakeTurn = async () => {
    const baseURL = import.meta.env.VITE_REST_API_SERVER_URL;
    const reqHeaders = {
      headers: {
        'current-game': JSON.stringify(getGameInstanceInfo()),
        Authorization: sessionStorage.getItem('token'),
      },
    };
    try {
      const resp = await axios.patch(`${baseURL}/games/${id}/take-turn`, {}, reqHeaders);
      console.log(resp.data.turnStatus);
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
