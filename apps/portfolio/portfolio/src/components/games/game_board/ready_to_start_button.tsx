import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import axios from 'axios';
import { Dispatch } from 'react';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { breakpointsStartGameButtonBox, breakpointsStartGameButtonFormButton } from '../../../styles/games-styles';
import getGameInstanceInfo from '../../../utils/utils';
import { Action, ActionType } from './socket-reducer';

interface ReadyToStartProps {
  dispatch: Dispatch<Action>;
  socket: Socket;
}

export default function ReadyToStart({ dispatch, socket }: ReadyToStartProps) {
  const __baseURL__ = import.meta.env.VITE_REST_API_SERVER_URL;
  const params = useParams();

  const id = params.id;
  const reqHeaders = {
    headers: {
      'current-game': JSON.stringify(getGameInstanceInfo()),
    },
  };

  const handleStartGame = async () => {
    const resp = await axios.patch(`${__baseURL__}/games/${id}/start`, {}, reqHeaders);
    dispatch({ type: ActionType.START, socket: socket });
    console.log(resp.data.message);
  };

  return (
    <Container component={'section'} sx={breakpointsStartGameButtonBox}>
      <Button onClick={handleStartGame} variant="outlined" type="button" sx={breakpointsStartGameButtonFormButton}>
        Start Game
      </Button>
    </Container>
  );
}
