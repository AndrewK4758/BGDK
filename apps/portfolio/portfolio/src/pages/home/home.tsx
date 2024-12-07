import Box from '@mui/material/Box';
import type { JSX } from 'react';
import Intro from '../../components/intro/intro';
import PicutreAndResume from '../../components/intro/picture-resume';
import TechStackList from '../../components/intro/tech-list/tech-list';
import { baseStyleForHomeItems } from '../../styles/intro-styles';

/**
 * This is the main home component that renders the introduction section of the portfolio website.
 * It includes a brief introduction, a picture with a resume download button, and a list of technologies I am familiar with.
 *
 * @returns {JSX.Element} The rendered home component.
 */

const Home = (): JSX.Element => (
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
