import Intro from '../../components/intro/intro';
import PicutreAndResume from '../../components/intro/picture-resume';
import TechStackList from '../../components/tech-list/tech-list';
import Box from '@mui/material/Box';

const Home = () => (
  <>
    <Box
      component={'div'}
      key={'intro-wrapper'}
      id="intro-wrapper"
      sx={{
        // flex: '0 1 auto',
        width: '90%',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Intro />

      <PicutreAndResume />
    </Box>
    <Box
      component={'div'}
      key={'tech-stack-wrapper'}
      id="tech-stack-wrapper"
      sx={{
        width: '90%',
        display: 'flex',

        justifyContent: 'center',
      }}
    >
      <TechStackList />
    </Box>
  </>
);

export default Home;
