import Box from '@mui/material/Box';
import ActiveGameSession from './chutes-and-ladders';
import { Paper } from '@mui/material';
import { GameContextProps, GameContext } from '../../contexts/contexts';
import { useContext, useEffect } from 'react';

const ids = JSON.parse(sessionStorage.getItem('playersIds') as string);

export const ActiveGames = () => {
  const { gameContext, setGameContext } = useContext(GameContext) as GameContextProps;
  console.log(gameContext);
  useEffect(() => {
    if (gameContext.playerIds.length === 0) setGameContext({ ...gameContext, playerIds: ids });
  });

  return (
    <Box
      component={'div'}
      key={'active-games-wrapper'}
      id="active-games-wrapper"
      // onLoad={e => handleScrollIntoView(e)}
    >
      <Paper></Paper>
    </Box>
  );
};

export default ActiveGames;
{
  /* <ActiveGameSession /> */
}
