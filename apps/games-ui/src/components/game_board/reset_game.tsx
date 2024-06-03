import { ButtonFormAction, Theme } from '@aklapper/react-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getGameInstanceInfo } from '../../services/utils';
import { SxProps } from '@mui/material';

const breakpointsResetGameButton: SxProps = {
  marginLeft: '.5rem',
  backgroundColor: Theme.palette.info.main,
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '17px',
    width: 130,
    height: 35,
  },
};

export default function ResetGame() {
  const params = useParams();
  const id = params.id;

  const handleResetGame = async () => {
    const __baseURL__ = import.meta.env.VITE_API_SERVER_URL;
    const __current_game__ = JSON.stringify(getGameInstanceInfo());
    try {
      await axios.patch(
        `${__baseURL__}/games/${id}/reset`,
        {},
        { headers: { 'current-game': __current_game__ } }
      );
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return (
    <ButtonFormAction
      method={'patch'}
      action={undefined}
      handleSubmit={handleResetGame}
      variant="outlined"
      name="Reset Game"
      value={'reset-game'}
      type="submit"
      sx={breakpointsResetGameButton}
      buttonText="Reset"
    />
  );
}
