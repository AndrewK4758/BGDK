import { Text } from '@bgdk/shared-react-components';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { JSX } from 'react';
import {
  introCardContentSxProps,
  introCardSxProps,
  introTextSxProps,
  introTitleTextSxProps,
} from '../../styles/intro-styles';
import { ABOUT_ME_TITLE, IntroText } from './static/intro-text';

/**
 * This component renders a card containing a brief introduction of me.
 *
 * @returns {JSX.Element} The rendered intro component.
 */

const Intro = (): JSX.Element => (
  <Card key={'intro-card'} id={'intro-card'} elevation={24} sx={introCardSxProps}>
    <CardContent component={'div'} id="about-me-header-box" key="about-me-header-box" sx={introCardContentSxProps}>
      <Text
        component={'h1'}
        titleVariant="h1"
        key={'about-me-title-text'}
        id="about-me-title-text"
        data-testid="about-me-title-text"
        sx={introTitleTextSxProps}
        titleText={ABOUT_ME_TITLE}
      />
      <Text
        component={'p'}
        key={'about-me-text'}
        id="about-me-text"
        data-testid="about-me-text"
        titleVariant="body1"
        titleText={<IntroText />}
        sx={introTextSxProps}
      />
    </CardContent>
  </Card>
);

export default Intro;
