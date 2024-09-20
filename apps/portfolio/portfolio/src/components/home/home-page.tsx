import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import self from '../../assets/self.webp';
import Theme from '../../styles/theme';
import EmailIcon from '../icons/email-icon';
import ResumeIcon from '../icons/resume-icon';
import { useState } from 'react';
import EmailDialog from '../email/email-dialog';
import { Container } from '@mui/material';

const Home = () => {
  const [openEmail, setOpenEmail] = useState<boolean>(false);

  return (
    <Box component={'div'} key={'main-wrapper'} id="main-wrapper" sx={{ filter: openEmail ? 'blur(3px)' : null }}>
      <Paper
        component={'section'}
        key={'main-intro-wrapper'}
        id="main-intro-wrapper"
        sx={{ display: 'flex', paddingX: '2%' }}
      >
        <Card component={'span'} key={'main-intro-card'} id="main-info-card" sx={{ flex: '1 0 35%', height: 'auto' }}>
          <CardContent>
            <Typography variant="h1" key={'main-intro-text'} id="main-intro-text" sx={{}}>
              Hi, I'm Andrew Klapper
            </Typography>
          </CardContent>
          <CardMedia>
            <img
              src={self}
              loading="lazy"
              alt="andrew"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 100,
                border: `5px solid ${Theme.palette.primary.dark}`,
              }}
            />
          </CardMedia>
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
              sx={{ fontSize: '3rem' }}
              endIcon={<ResumeIcon />}
            >
              Resume
            </Button>
            <Button onClick={() => setOpenEmail(true)} variant="text" sx={{ fontSize: '3rem' }} endIcon={<EmailIcon />}>
              Message
            </Button>
          </CardActions>
        </Card>
        <Box component={'span'} key={'main-info-text'} id="main-info-text" sx={{ flex: '1 0 65%' }}>
          <Container>
            <Typography variant="h3" sx={{}}>
              I'm a Full-Stack web developer looking to turn your ideas and inspirations into a digital reality by
              taking what makes your business special, and translating it into a web based experience you and your
              clients will enjoy.
            </Typography>
          </Container>
          <List component={'ul'}></List>
        </Box>
      </Paper>
      <Box component={'div'} key={'email-form-wrapper'} id="email-form-wrapper" width={'100%'}>
        <EmailDialog open={openEmail} setOpen={setOpenEmail} />
      </Box>
    </Box>
  );
};

export default Home;
