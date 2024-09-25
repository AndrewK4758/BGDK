import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Theme from '../../styles/theme';
import Paper from '@mui/material/Paper';

const AboutMe = () => (
  <Paper
    elevation={24}
    component={'div'}
    id="main-info-text-title-container"
    sx={{
      top: '8 rem',
      flex: '0 1 30%',
      position: 'relative',
      height: 'fit-content',
      border: `3px solid ${Theme.palette.primary.dark}`,
      borderRadius: 5,
    }}
  >
    <Container
      component={'div'}
      id="about me"
      sx={{
        zIndex: 1,
        backgroundColor: Theme.palette.background.paper,
      }}
    >
      <Typography variant="h3" sx={{ borderBottom: `2px solid ${Theme.palette.primary.dark}`, width: 'fit-content' }}>
        About Me
      </Typography>
      <Typography id="main-info-text-title" variant="body1" sx={{ paddingY: 2 }}>
        When I am not working on projects, I enjoy, tutoring members of a group I belong to,{' '}
        <Link
          target="_blank"
          rel="noreferrer"
          to="https://woodstock.dev"
          id="link-to-woodstock.dev"
          style={{
            textDecoration: 'none',
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
    </Container>
  </Paper>
);

export default AboutMe;
