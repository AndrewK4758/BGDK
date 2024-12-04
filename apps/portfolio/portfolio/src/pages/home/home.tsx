import Box from '@mui/material/Box';
import type { SxProps } from '@mui/material/styles';
import Intro from '../../components/intro/intro';
import PicutreAndResume from '../../components/intro/picture-resume';
import TechStackList from '../../components/tech-list/tech-list';

const baseStyleForHomeItems: SxProps = {
  width: '80vw',
  display: 'flex',
};

const Home = () => (
  <Box
    component={'div'}
    key={'home'}
    id="home"
    data-testid="home"
    sx={{ ...baseStyleForHomeItems, flexDirection: 'column', gap: '15vh' }}
  >
    <Box
      component={'div'}
      key={'intro-wrapper'}
      id="intro-wrapper"
      sx={{
        ...baseStyleForHomeItems,
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
        ...baseStyleForHomeItems,
        justifyContent: 'center',
      }}
    >
      <TechStackList />
    </Box>
  </Box>
);

export default Home;
