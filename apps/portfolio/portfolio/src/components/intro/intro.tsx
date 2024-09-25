import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Theme from '../../styles/theme';
import Box from '@mui/material/Box';

const Intro = () => (
  <Card
    elevation={24}
    sx={{
      position: 'relative',
      borderRadius: 5,
      zIndex: 1,
      flex: '0 1 50%',
      height: 'fit-content',
      display: 'flex',
    }}
  >
    <Box sx={{ borderRadius: 5 }}>
      <CardContent component={'div'} id="about-me-header-box" sx={{ paddingX: 2 }}>
        <Typography
          variant="h4"
          key={'about-me-text'}
          id="about-me-text"
          sx={{ textAlign: 'center', borderBottom: `3px solid ${Theme.palette.primary.dark}` }}
        >
          Hi, I'm Andrew Klapper
        </Typography>
        <Typography id="home-text-title" variant="body1" sx={{ textAlign: 'left', paddingY: 2 }}>
          A Full-Stack web developer looking to turn your ideas and inspirations into a digital reality by translating
          your business needs or personal passions into a web based experience you and your clients will enjoy.
        </Typography>
      </CardContent>
    </Box>
  </Card>
);

export default Intro;
