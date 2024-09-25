import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import handleScrollIntoView from '../../services/events/handle-scroll-into-view';
import Theme from '../../styles/theme';

const Crud = () => (
  <Box
    component={'div'}
    key={'crud-wrapper'}
    id="crud-wrapper"
    onLoad={e => handleScrollIntoView(e)}
    sx={{
      border: '5px solid orange',
      height: 'fit-content',
      width: '100%',
    }}
  >
    <Box
      id="crud-title"
      sx={{
        border: '5px solid purple',
        height: '20vh ',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h2" sx={{ border: '5px solid green' }}>
        {`TITLE DIVIDER FOR OUTLET ON ROUTE /crud`}
      </Typography>
    </Box>
    <Box
      component={'div'}
      key={'crud-app-wrapper'}
      id="crud-app-wrapper"
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
      <Card elevation={24} sx={{ width: '80%', height: '100%', display: 'flex', justifyContent: 'center' }}>
        <Box
          component={'iframe'}
          src="http://localhost:5200"
          id="crud-iframe"
          about="crud iframe"
          key={'crud-iframe'}
          sx={{ height: '100%', width: '100%', border: 0, zIndex: 5, borderRadius: 5 }}
        />
      </Card>
    </Box>
  </Box>
);

export default Crud;
