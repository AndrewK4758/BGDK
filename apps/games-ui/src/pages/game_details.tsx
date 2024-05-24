import { IBuiltGame, IRule } from '@aklapper/model';
import { HeadingWithDetails, RenderList, Text } from '@aklapper/react-components';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import { useParams, useRouteLoaderData } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import RegisterGame from '../components/register_game';

const listRulesCallback = (e: IRule, i: number, arr: IRule[]) => (
  <Fragment key={e.title}>
    <HeadingWithDetails
      component={'li'}
      id={e.order}
      titleVariant="h2"
      titleText={e.title}
      valueVariant="body1"
      valueText={e.value}
    />
  </Fragment>
);

const GameDetails = () => {
  const loader = useRouteLoaderData('gameList') as IBuiltGame[];
  const selectedName = useParams().id?.replace(/-/g, ' ');

  const selectedGame = loader.find(({ name }) => name === selectedName);

  if (selectedGame) {
    const gameDetails: IRule[] = selectedGame.rules;
    return (
      <Container component={'div'} sx={{ flexDirection: 'column', marginTop: '1.5rem' }}>
        <Text titleVariant="h1" titleText={selectedName} />
        <List component={'ul'}>
          <RenderList data={gameDetails} listMapCallback={listRulesCallback} />
        </List>
        <RegisterGame />
      </Container>
    );
  } else return <Text titleVariant="h1" titleText={'GAME DOES NOT EXIST --- OR ERROR --- OR SOMETHING ELSE'} />;
};

export default GameDetails;
