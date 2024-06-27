import { Theme } from '@bgdk/react-components';
import { SxProps } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';
import { getGameInstanceInfo } from '../../services/utils/utils';

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
  buttonPress: boolean;
  setButtonPress: Dispatch<SetStateAction<boolean>>;
}

export default function ReadyToStart({
  buttonPress,
  setButtonPress,
}: ReadyToStartProps) {
  const __baseURL__ = import.meta.env.VITE_REST_API_SERVER_URL;
  const params = useParams();

  const id = params.id;
  const __current_game__ = JSON.stringify(getGameInstanceInfo());

  const handleStartGame = async () => {
    const resp = await axios.patch(
      `${__baseURL__}/games/${id}/start`,
      {},
      { headers: { 'current-game': __current_game__ } }
    );
    if (!buttonPress) setButtonPress(true);
    console.log(resp.data.gameStatus);
  };

  return (
    <Container component={'section'} sx={breakpointsStartGameButtonBox}>
      <Button
        onClick={handleStartGame}
        variant="outlined"
        type="button"
        sx={breakpointsStartGameButtonFormButton}
      >
        Start Game
      </Button>
    </Container>
  );
}
