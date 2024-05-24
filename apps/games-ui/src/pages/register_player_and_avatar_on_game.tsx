import { IRegisterLoaderAndFilter } from '@aklapper/model';
import { Text, Theme } from '@aklapper/react-components';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useLocation, useRouteLoaderData } from 'react-router-dom';
import RegisterPlayerAndAvatarForm from '../components/formik_form_components/register_player_and_avatar_formik';

export default function RegisterPlayerAndAvatarOnGame() {
  const loader = useRouteLoaderData('registerData') as IRegisterLoaderAndFilter;
  const location = useLocation();

  const gameID = loader.gamePlayerIDs.gameInstanceID;
  const playerID = loader.gamePlayerIDs.playerID;

  const gameLocatordata = location.pathname.replace('register', `${gameID}`).slice(1);

  return (
    <>
      <Container component={'div'} sx={{ borderBottom: `5px solid ${Theme.palette.background.paper}` }}>
        <Box sx={{ flex: '1 0 33.3%' }}>
          <Text titleVariant="h2" titleText={'Game ID:'} />
          <Text titleVariant="body1" titleText={gameID} />
        </Box>
        <Box sx={{ flex: '1 0 33.3%' }}>
          <Text titleVariant="h2" titleText={'Player ID: '} />
          <Text titleVariant="body1" titleText={`${playerID ? playerID : 'Please Register'}`} />
        </Box>
        <Box sx={{ flex: '1 0 33.3%' }}>
          <Text titleVariant="h2" titleText={'Game Link:'} />
          <Text titleVariant="body1" titleText={gameLocatordata} />
        </Box>
      </Container>
      <RegisterPlayerAndAvatarForm />
    </>
  );
}
