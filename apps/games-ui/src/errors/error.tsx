import { Text } from '@aklapper/react-components';
import Container from '@mui/material/Container';

interface INoGameError {
  noGameInstance: string;
}

interface INotEnoughPlayers {
  notEnoughPlayers: string;
}
export const NoGameError = () => {
  const error: INoGameError = {
    noGameInstance: 'GAME IS NOT FOUND. PLEASE GO BACK AND REGISTER A NEW GAME TO CONTINUE',
  };

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
