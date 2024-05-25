import { IBuiltGame } from '@aklapper/model';
import { ImageLink, RenderList, Text, Theme } from '@aklapper/react-components';
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import { useRouteLoaderData } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

const listGamesMap = (e: IBuiltGame, i: number, arr: IBuiltGame[]) => (
  <Fragment key={e.id}>
    <ImageLink
      type="a"
      to={`${e.name.replace(/ /g, '-')}`}
      id={e.name}
      srcSet={e.imageURL}
      loading="lazy"
      alt={`${e.name} game picture`}
      style={{ width: 350, height: 'auto' }}
      title={e.name}
      position="bottom"
    />
  </Fragment>
);

const GamesList = () => {
  const games = useRouteLoaderData('gameList') as IBuiltGame[];
  return (
    <Container
      component={'div'}
      sx={{ flexDirection: 'column', alignItems: 'center', justifyItems: 'center', padding: 3 }}
    >
      <Text titleVariant="h1" titleText={'Games'} />
      <ImageList
        variant="standard"
        cols={2}
        rowHeight={365}
        gap={4}
        sx={{
          backgroundColor: Theme.palette.info.main,
          boxShadow: `0px 7px 8px -4px ${Theme.palette.success.main}, 0px 12px 17px 2px ${Theme.palette.primary.light}, 0px 5px 22px 4px ${Theme.palette.primary.dark}, 0px -7px 8px -4px ${Theme.palette.success.main}, 0px -12px 17px 2px ${Theme.palette.primary.light}, 0px -5px 22px 4px ${Theme.palette.primary.dark}`,
        }}
      >
        <RenderList data={games} listMapCallback={listGamesMap} />
      </ImageList>
    </Container>
  );
};

export default GamesList;

//
