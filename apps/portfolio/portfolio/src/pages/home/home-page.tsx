import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import self from '../../assets/self.webp';
import TechStackList from '../../components/home/tech-list/tech-list';
import ResumeIcon from '../../components/icons/resume-icon';
import Theme from '../../styles/theme';

const Home = () => (
  <Paper
    component={'div'}
    key={'home-wrapper'}
    id="home-wrapper"
    sx={{
      display: 'flex',
      height: '100%',
      padding: 2,
      flex: '1 0 100%',
      borderRadius: 5,
    }}
  >
    <Card
      component={'span'}
      elevation={0}
      key={'home-card'}
      id="home-card"
      sx={{
        flex: '1 0 35%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardContent component={'div'} id="home-card-header-box" sx={{ paddingX: 2 }}>
        <Typography
          variant="h1"
          key={'home-card-text'}
          id="home-card-text"
          sx={{ textAlign: 'center', borderBottom: `3px solid ${Theme.palette.primary.dark}` }}
        >
          Hi, I'm Andrew Klapper
        </Typography>
        <Typography id="home-text-title" variant="body1" sx={{ textAlign: 'left', paddingY: 2 }}>
          A Full-Stack web developer looking to turn your ideas and inspirations into a digital reality by translating
          your business needs or personal passions into a web based experience you and your clients will enjoy.
        </Typography>
      </CardContent>
      <CardMedia
        component={'img'}
        src={self}
        loading="lazy"
        alt="andrew"
        sx={{
          width: '100%',
          height: 'auto',
          borderRadius: 15,
          border: `5px solid ${Theme.palette.primary.dark}`,
          zIndex: 1,
        }}
      />
      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <Button
          LinkComponent={'a'}
          href={'/Resume.pdf'}
          download={`andrew-klapper-resume-${new Date().toLocaleDateString()}`}
          variant="text"
          sx={{ fontSize: '3rem', zIndex: 1 }}
          endIcon={<ResumeIcon />}
        >
          Resume
        </Button>
      </CardActions>
    </Card>
    <Box component={'section'} key={'main-info-text'} id="main-info-text" sx={{ flex: '1 0 65%' }}>
      <Container component={'div'} id="main-info-text-title-container" sx={{ paddingY: 2 }}>
        <Container
          component={'div'}
          id="about me"
          sx={{ border: `3px solid ${Theme.palette.primary.dark}`, borderRadius: 8, zIndex: 1 }}
        >
          <Typography
            variant="h3"
            sx={{ borderBottom: `2px solid ${Theme.palette.primary.dark}`, width: 'fit-content' }}
          >
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
            (WDG), sharpening my generative-ai prompting and agent generation skills, fishing the North Georgia streams
            and lakes, camping in the spring and fall seasons, and working on my project truck. Yes there is a large
            contrast between my hobbies, but each brings a balance to the others and all skills learned are applicable
            in all other areas. I am truly happy and blessed to have been able to find my ideal happy balance in life.
          </Typography>
        </Container>
      </Container>
      <Box component={'div'} id="tech-list-wrapper" sx={{ display: 'flex', flexDirection: 'column' }}>
        <TechStackList />
      </Box>
    </Box>
  </Paper>
);


export default Home;
