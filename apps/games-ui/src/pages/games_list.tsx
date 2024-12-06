import { ImageLink, Theme } from '@bgdk/react-components';
import { RenderList, Text } from '@bgdk/shared-react-components';
import { IBuiltGame } from '@bgdk/types-game';
import { SxProps, useMediaQuery } from '@mui/material';
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import { useRouteLoaderData } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

const breakpointsGameListText: SxProps = {
  [Theme.breakpoints.down('md')]: {
    fontSize: '4rem',
  },
};

const breakpointsImageListText: SxProps = {
  fontSize: '12px',
  [Theme.breakpoints.down('md')]: {
    '& .MuiImageListItemBar-title': {
      fontSize: '1.5rem',
    },
  },
};

const GamesList = () => {
  const games = useRouteLoaderData('gameList') as IBuiltGame[];
  const media = useMediaQuery(Theme.breakpoints.up('md'));

  const listGamesMap = (e: IBuiltGame, _i: number, _arr: IBuiltGame[]) => (
    <Fragment key={e.id}>
      <ImageLink
        type="a"
        to={`${e.name.replace(/ /g, '-')}`}
        id={e.name}
        srcSet={`./images/${e.imageURL}`}
        loading="lazy"
        alt={`${e.name} game picture`}
        style={{
          width: `${media ? '365px' : '200px'}`,
        }}
        title={e.name}
        position="bottom"
        breakpointsImageListText={breakpointsImageListText}
      />
    </Fragment>
  );
  return (
    <>
      <Container
        component={'div'}
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyItems: 'center',
        }}
      >
        <Text titleVariant="h1" titleText={'Games'} sx={breakpointsGameListText} />
      </Container>
      <Container component={'div'}>
        <ImageList variant="standard" cols={media ? 2 : 1} rowHeight={media ? 365 : 200} gap={12} sx={{ m: 0 }}>
          <RenderList data={games} listMapCallback={listGamesMap} />
        </ImageList>
      </Container>
    </>
  );
};

export default GamesList;

//
