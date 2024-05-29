import { ButtonFormAction } from '@aklapper/react-components';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getGameInstanceInfo } from '../../services/utils';

export default function ReadyToStart() {
  const __baseURL__ = import.meta.env.VITE_API_SERVER_URL;
  const params = useParams();

  const id = params.id;
  const __current_game__ = JSON.stringify(getGameInstanceInfo());

  const handleStartGame = async () => {
    const resp = await axios.patch(
      `${__baseURL__}/games/${id}/start`,
      {},
      { headers: { 'current-game': __current_game__ } }
    );
    console.log(resp.data.message);
  };

  return (
    <Container component={'section'} sx={{ flex: '0 1 30%', justifyContent: 'center', alignContent: 'center' }}>
      <ButtonFormAction
        method={undefined}
        action={undefined}
        handleSubmit={handleStartGame}
        variant="outlined"
        value={'ready-to-start-button'}
        name="ready to play"
        type="submit"
        sx={{ flex: '0 1 auto', textAlign: 'center' }}
        buttonText="Start Game"
      />
    </Container>
  );
}
