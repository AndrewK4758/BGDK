import { IBuiltGame } from '@aklapper/model';
import { ImageLink, RenderList, Text, Theme } from '@aklapper/react-components';
import { SxProps, useMediaQuery } from '@mui/material';
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import { useRouteLoaderData } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

const breakpointsGameListText: SxProps = {
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '4rem',
  },
};

const listGamesMap = (e: IBuiltGame, i: number, arr: IBuiltGame[]) => (
  <Fragment key={e.id}>
    <ImageLink
      type="a"
      to={`${e.name.replace(/ /g, '-')}`}
      id={e.name}
      srcSet={e.imageURL}
      loading="lazy"
      alt={`${e.name} game picture`}
      style={{ width: '100%', height: 'auto' }}
      title={e.name}
      position="bottom"
    />
  </Fragment>
);

const GamesList = () => {
  const games = useRouteLoaderData('gameList') as IBuiltGame[];
  const media = useMediaQuery('laptop');
  return (
    <Container
      component={'div'}
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyItems: 'center',
        padding: 3,
      }}
    >
      <Text
        titleVariant="h1"
        titleText={'Games'}
        sx={breakpointsGameListText}
      />
      <ImageList
        variant="standard"
        rowHeight={media ? 365 : 220}
        cols={media ? 2 : 1}
        gap={4}
      >
        <RenderList data={games} listMapCallback={listGamesMap} />
      </ImageList>
    </Container>
  );
};

export default GamesList;

//
