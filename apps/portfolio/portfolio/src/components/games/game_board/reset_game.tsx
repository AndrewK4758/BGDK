import { SxProps } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Dispatch, type SetStateAction } from 'react';
import { useParams } from 'react-router-dom';
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

const baseURL = import.meta.env.VITE_GAMES_API_URL;

interface ResetGameProps {
  dispatch: Dispatch<Action>;
  socket: Socket;
  setSpace: Dispatch<SetStateAction<HTMLDivElement | undefined>>;
}

export default function ResetGame({ dispatch, socket, setSpace }: ResetGameProps) {
  const { id } = useParams() ;

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

const handleResetGame = async ({ dispatch, socket, setSpace, id }: ResetGameProps & { id: string | undefined }) => {
  const reqHeaders = {
    headers: {
      'current-game': JSON.stringify(getGameInstanceInfo()),
    },
  };
  try {
    await axios.patch(`${baseURL}/games/${id}/reset`, {}, reqHeaders);
    dispatch({ type: ActionType.RESET, socket: socket });
    setSpace(undefined);
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
