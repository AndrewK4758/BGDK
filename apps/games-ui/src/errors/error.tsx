import { Text } from '@bgdk/shared-react-components';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

interface INoGameError {
  noGameInstance: string;
}

interface INotEnoughPlayers {
  notEnoughPlayers: string;
}
export const NoGameError = () => {
  const nav = useNavigate();
  const error: INoGameError = {
    noGameInstance: 'GAME IS NOT FOUND. PLEASE GO BACK AND REGISTER A NEW GAME TO CONTINUE',
  };

  setTimeout(() => {
    return nav('/');
  }, 4000);
  return (
    <Container component={'div'}>
      <Text titleVariant="h1" titleText={error.noGameInstance} />
    </Container>
  );
};

export const NotEnoughPlayersError = () => {
  const error: INotEnoughPlayers = {
    notEnoughPlayers: 'Must be minumum of 2 players',
  };

  return (
    <Container component={'div'}>
      <Text titleVariant="h1" titleText={error.notEnoughPlayers} />
    </Container>
  );
};
