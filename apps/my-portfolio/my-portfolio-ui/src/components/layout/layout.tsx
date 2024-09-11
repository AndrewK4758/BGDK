import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '../../styles.css';
import Theme from '../../styles/theme';

const Layout = () => {
  return (
    <Box component={'div'} bgcolor={Theme.palette.background.default}>
      <Typography variant="h1" color="primary">
        LAYOUT
      </Typography>

      <Typography variant="h2">LAYOUT</Typography>
    </Box>
  );
};

export default Layout;
