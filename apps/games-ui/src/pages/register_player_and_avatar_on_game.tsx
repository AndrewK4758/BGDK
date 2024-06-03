import { IRegisterLoaderAndFilter } from '@aklapper/model';
import { Text, Theme } from '@aklapper/react-components';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useLocation, useRouteLoaderData } from 'react-router-dom';
import RegisterPlayerAndAvatarForm from '../components/formik_form_components/register_player_and_avatar_formik';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import { SxProps } from '@mui/material';

const breakpointsRegisterPlayerTitle: SxProps = {
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '2rem',
  },
};

const breakpointsRegisterPlayerTitleBox: SxProps = { flex: '1 0 33.3%' };

const breakpointsRegisterPlayerTitleValue: SxProps = {
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '1rem',
  },
};

const breakpointsCopyIcon: SxProps = {
  fontSize: '2.5rem',
  color: Theme.palette.primary.contrastText,
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '1.25rem',
  },
};

const handleCopyGameLinkToClipboard = (
  gameLocatordata: string
): Promise<void> => navigator.clipboard.writeText(gameLocatordata);

export default function RegisterPlayerAndAvatarOnGame() {
  const loader = useRouteLoaderData('registerData') as IRegisterLoaderAndFilter;
  const location = useLocation();

  const gameID = loader.gamePlayerIDs.gameInstanceID;
  const playerID = loader.gamePlayerIDs.playerID;

  const gameLocatordata = location.pathname
    .replace('register', `${gameID}`)
    .slice(1);

  return (
    <>
      <Container
        component={'section'}
        sx={{ borderBottom: `5px solid ${Theme.palette.background.paper}` }}
      >
        <Box sx={breakpointsRegisterPlayerTitleBox}>
          <Text
            titleVariant="h2"
            titleText={'Game ID:'}
            sx={breakpointsRegisterPlayerTitle}
          />
          <Text
            titleVariant="body1"
            titleText={gameID}
            sx={breakpointsRegisterPlayerTitleValue}
          />
        </Box>
        <Box sx={breakpointsRegisterPlayerTitleBox}>
          <Text
            titleVariant="h2"
            titleText={'Player ID: '}
            sx={breakpointsRegisterPlayerTitle}
          />
          <Text
            titleVariant="body1"
            titleText={`${playerID ? playerID : 'Please Register'}`}
            sx={breakpointsRegisterPlayerTitleValue}
          />
        </Box>
        <Box sx={breakpointsRegisterPlayerTitleBox}>
          <Text
            titleVariant="h2"
            titleText={'Game Link:'}
            sx={breakpointsRegisterPlayerTitle}
          />
          <Text
            titleVariant="body1"
            titleText={gameLocatordata}
            sx={breakpointsRegisterPlayerTitleValue}
          />
          <IconButton
            onClick={() => handleCopyGameLinkToClipboard(gameLocatordata)}
            sx={{
              '&:hover': { backgroundColor: Theme.palette.primary.main },
            }}
          >
            <ContentCopyIcon
              titleAccess="Copy Game Link"
              sx={breakpointsCopyIcon}
            />
          </IconButton>
        </Box>
      </Container>
      <RegisterPlayerAndAvatarForm />
    </>
  );
}
