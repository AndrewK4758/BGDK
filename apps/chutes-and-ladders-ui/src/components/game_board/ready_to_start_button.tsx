import { Theme } from '@bgdk/react-components';
import { SxProps } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getGameInstanceInfo } from '../../services/utils/utils';
import { Dispatch } from 'react';
import { Socket } from 'socket.io-client';
import { Action, ActionType } from '../../hooks/socket-reducer';

const breakpointsStartGameButtonBox: SxProps = {
  flex: '0 1 20%',
  justifyItems: 'center',
  alignContent: 'center',
  [Theme.breakpoints.down('laptop')]: {},
};

const breakpointsStartGameButtonFormButton: SxProps = {
  textAlign: 'center',
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '17px',
    width: 130,
    height: 35,
  },
};

interface ReadyToStartProps {
  dispatch: Dispatch<Action>;
  socket: Socket;
}

export default function ReadyToStart({ dispatch, socket }: ReadyToStartProps) {
  const __baseURL__ = import.meta.env.VITE_REST_API_SERVER_URL;
  const params = useParams();

  const id = params.id;
  const __current_game__ = JSON.stringify(getGameInstanceInfo());

  const handleStartGame = async () => {
    const resp = await axios.patch(
      `${__baseURL__}/games/${id}/start`,
      {},
      { headers: { 'current-game': __current_game__ } },
    );
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
