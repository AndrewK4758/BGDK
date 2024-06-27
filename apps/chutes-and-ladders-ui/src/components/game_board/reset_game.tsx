import { Theme } from '@bgdk/react-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getGameInstanceInfo } from '../../services/utils/utils';
import { SxProps } from '@mui/material';
import Button from '@mui/material/Button';
import { Dispatch, SetStateAction } from 'react';

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
  buttonPress: boolean;
  setButtonPress: Dispatch<SetStateAction<boolean>>;
}

export default function ResetGame({
  buttonPress,
  setButtonPress,
}: ResetGameProps) {
  const params = useParams();
  const id = params.id;

  const handleResetGame = async () => {
    const __baseURL__ = import.meta.env.VITE_REST_API_SERVER_URL;
    const __current_game__ = JSON.stringify(getGameInstanceInfo());
    try {
      await axios.patch(
        `${__baseURL__}/games/${id}/reset`,
        {},
        { headers: { 'current-game': __current_game__ } }
      );
      setButtonPress(!buttonPress);
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return (
    <Button
      onClick={handleResetGame}
      variant="outlined"
      type="button"
      sx={breakpointsResetGameButton}
    >
      Reset{' '}
    </Button>
  );
}
