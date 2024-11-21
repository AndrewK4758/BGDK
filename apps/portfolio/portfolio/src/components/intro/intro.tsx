import { Text } from '@bgdk/react-components';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { SxProps } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Theme from '../../styles/theme';

const INTRO_TEXT = (
  <span id="intro-text" key={'intro-text'}>
    A Full-Stack web developer looking to turn your ideas and inspirations into a digital reality by translating your
    business needs or personal passions into a web based experience that you and your clients will enjoy. When I am not
    working on projects, I enjoy, tutoring members of a group I belong to,{' '}
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
  </span>
);

const introCardSxProps: SxProps = {
  position: 'relative',
  zIndex: 1,
  flex: '0 1 50%',
  height: 'fit-content',
  display: 'flex',
};
const introCardContentSxProps: SxProps = { paddingX: 2, display: 'flex', flexDirection: 'column' };

const introTextSxProps: SxProps = { textAlign: 'start', paddingY: 2, fontSize: '1.25rem' };
const introTitleTextSxProps: SxProps = {
  borderBottom: `3px solid ${Theme.palette.primary.dark}`,
  width: 'fit-content',
  alignSelf: 'center',
};

const Intro = () => (
  <Card elevation={24} sx={introCardSxProps}>
    <CardContent component={'div'} id="about-me-header-box" sx={introCardContentSxProps}>
      <Text
        titleVariant="h2"
        key={'about-me-title-text'}
        id="about-me-title-text"
        sx={introTitleTextSxProps}
        titleText={"Hi, I'm Andrew Klapper"}
      />
      <Text
        key={'about-me-text'}
        id="about-me-text"
        titleVariant="body1"
        titleText={INTRO_TEXT}
        sx={introTextSxProps}
      />
    </CardContent>
  </Card>
);

export default Intro;
