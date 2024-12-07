import { Theme } from '@bgdk/shared-react-components';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

export const ABOUT_ME_TITLE = "Hi, I'm Andrew Klapper";

export const IntroText = () => (
  <Box component={'span'} id="intro-text" data-testid="intro-text" key={'intro-text'}>
    A Full-Stack web developer looking to turn your ideas and inspirations into a digital reality by translating your
    business needs or personal passions into a web based experience that you and your clients will enjoy. When I am not
    working on projects, I enjoy, tutoring members of a group I belong to,{' '}
    <Link
      key={'link-to-woodstock.dev'}
      rel="noreferrer noopener"
      target="_blank"
      to="https://woodstock.dev"
      id="link-to-woodstock.dev"
      data-testid="link-to-woodstock.dev"
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
  </Box>
);
