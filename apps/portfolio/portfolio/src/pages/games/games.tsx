import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import handleScrollIntoView from '../../services/events/handle-scroll-into-view';
import Theme from '../../styles/theme';

const Games = () => (
  <Box
    component={'div'}
    key={'games-wrapper'}
    id="games-wrapper"
    onLoad={e => handleScrollIntoView(e)}
    sx={{
      border: '5px solid orange',
      height: 'fit-content',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Box
      id="games-title"
      sx={{
        border: '5px solid purple',
        height: '20vh ',
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        alignItems: 'center',
      }}
    >
      <Typography variant="h2" sx={{ border: '5px solid green' }}>
        {`Chutes & Ladders / Tic Tac Toe`}
      </Typography>
      <Typography variant="body1" sx={{ border: '5px solid green' }}>
        {`Yes, these are simple board games. When you take the concept of a board game, break it down into its individual parts, find the similarities and generalizations between board games generally, and isolate what makes each game unique, you can take this simple concept and generate a group of objects that you can easily build any board style game upon.`}
      </Typography>
    </Box>
    <Box
      component={'div'}
      key={'games-app-wrapper'}
      id="games-app-wrapper"
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        border: '5px solid yellow',
        backgroundColor: Theme.palette.background.paper,
        borderRadius: 5,
      }}
    >
      <Card
        elevation={24}
        sx={{
          width: '80%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          component={'iframe'}
          src="http://localhost:4200"
          id="games-iframe"
          about="games iframe"
          key={'games-iframe'}
          sx={{ height: '100%', width: '100%', border: 0, zIndex: 5, borderRadius: 5 }}
        />
      </Card>
    </Box>
  </Box>
);

export default Games;
