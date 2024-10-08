import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Theme from '../../styles/theme';
import { Link } from 'react-router-dom';

const Intro = () => (
  <Card
    elevation={24}
    sx={{
      position: 'relative',
      zIndex: 1,
      flex: '0 1 50%',
      height: 'fit-content',
      display: 'flex',
    }}
  >
    <CardContent
      component={'div'}
      id="about-me-header-box"
      sx={{ paddingX: 2, display: 'flex', flexDirection: 'column' }}
    >
      <Typography
        variant="h2"
        key={'about-me-text'}
        id="about-me-text"
        sx={{
          borderBottom: `3px solid ${Theme.palette.primary.dark}`,
          width: 'fit-content',
          alignSelf: 'center',
        }}
      >
        Hi, I'm Andrew Klapper
      </Typography>
      <Typography id="home-text-title" variant="body1" sx={{ textAlign: 'start', paddingY: 2 }}>
        A Full-Stack web developer looking to turn your ideas and inspirations into a digital reality by translating
        your business needs or personal passions into a web based experience you and your clients will enjoy. When I am
        not working on projects, I enjoy, tutoring members of a group I belong to,{' '}
        <Link
          rel="noreferrer"
          target="_blank"
          to="https://woodstock.dev"
          id="link-to-woodstock.dev"
          style={{
            textDecoration: 'none',
            color: Theme.palette.secondary.contrastText,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = Theme.palette.text.primary;
            e.currentTarget.style.backgroundColor = Theme.palette.secondary.dark;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = Theme.palette.secondary.contrastText;
            e.currentTarget.style.backgroundColor = Theme.palette.background.paper;
          }}
        >
          Woodstock Developers Group
        </Link>{' '}
        (WDG), sharpening my generative-ai prompting and agent generation skills, fishing the North Georgia streams and
        lakes, camping in the spring and fall seasons, and working on my project truck. Yes there is a large contrast
        between my hobbies, but each brings a balance to the others and all skills learned are applicable in all other
        areas. I am truly happy and blessed to have been able to find my ideal happy balance in life.
      </Typography>
    </CardContent>
  </Card>
);

export default Intro;
