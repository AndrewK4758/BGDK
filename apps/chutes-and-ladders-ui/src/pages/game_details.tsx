import { IBuiltGame } from '@bgdk/game-builder';
import { HeadingWithDetails, RenderList, Text, Theme } from '@bgdk/react-components';
import { IRule } from '@bgdk/rule';
import { SxProps } from '@mui/material';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import { useParams, useRouteLoaderData } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import RegisterGame from '../components/register_game';

const breakpointsGameDetailsTitle: SxProps = {
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '4rem',
  },
};

const breakpointsGameDetailsListTitle: SxProps = {
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '2rem',
  },
};

const breakpointsGameDetailsListValue: SxProps = {
  paddingX: '1rem',
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '1rem',
  },
};

const breakpointsGameDetailsRegisterButton: SxProps = {
  animation: 'blink 3s infinite',
  '@keyframes blink': {
    '50%': {
      color: Theme.palette.secondary.main,
      backgroundColor: Theme.palette.primary.contrastText,
    },
  },

  [Theme.breakpoints.down('laptop')]: {
    fontSize: '1rem',
    width: '130px',
    height: '35px',
  },
};

const listRulesCallback = (e: IRule, i: number, arr: IRule[]) => (
  <Fragment key={e.title}>
    <HeadingWithDetails
      component={'li'}
      id={e.order}
      titleVariant="h2"
      titleText={e.title}
      titleSx={breakpointsGameDetailsListTitle}
      valueVariant="body1"
      valueText={e.value}
      valueSx={breakpointsGameDetailsListValue}
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
        <Text titleVariant="h1" titleText={selectedName} sx={breakpointsGameDetailsTitle} />
        <List component={'ul'}>
          <RenderList data={gameDetails} listMapCallback={listRulesCallback} />
        </List>
        <RegisterGame registerGameButtonSx={breakpointsGameDetailsRegisterButton} />
      </Container>
    );
  } else return <Text titleVariant="h1" titleText={'GAME DOES NOT EXIST --- OR ERROR --- OR SOMETHING ELSE'} />;
};

export default GameDetails;
