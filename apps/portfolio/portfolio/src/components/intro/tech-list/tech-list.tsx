import { RenderList, Text } from '@bgdk/shared-react-components';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import type { JSX } from 'react';
import { techListSectionContainer, techlistTextStyle } from '../../../styles/intro-styles';
import { analytics, build, cloud, data, languages, libraries, styles, testing } from '../static/tech-stack-text';

/**
 * This function renders a single list item for the tech stack list.
 *
 * @param {string} e - The text of the list item.
 * @param {number} _i - The index of the list item.
 * @param {string[]} _arr - The array of list items.
 * @returns {JSX.Element} The rendered list item.
 */

const renderTechLists = (e: string, _i: number, _arr: string[]): JSX.Element => (
  <ListItem
    key={`${e}-wrapper`}
    id={`${e}-wrapper`}
    data-testid={`${e}-wrapper`}
    sx={{ justifyContent: 'space-between' }}
  >
    <ListItemText key={`${e}`} id={`${e}`} data-testid={`${e}`}>
      {e}
    </ListItemText>
    <ListItemIcon key={`${e}-svg-icon-wrapper`} id={`${e}-svg-icon-wrapper`} data-testid={`${e}-svg-icon-wrapper`}>
      <img
        key={`${e}-svg-icon`}
        data-testid={`${e}-svg-icon`}
        id={`${e}-svg-icon`}
        src={`/icons/${e.toLowerCase()}-icon.svg`}
        alt={`${e}-icon`}
        style={{ width: '32px', height: 'auto' }}
      />
    </ListItemIcon>
  </ListItem>
);

/**
 * This component renders a list of technologies i am strongest with.
 *
 * @returns {JSX.Element} The rendered tech stack list component.
 */

const TechStackList = (): JSX.Element => (
  <Paper elevation={24} sx={{ height: 'fit-content', p: 2 }}>
    <Container
      component={'div'}
      id="tech-list-text-container"
      data-testid="tech-list-title-text"
      sx={{ width: 'fit-content' }}
    >
      <Text
        component={'h3'}
        titleVariant="h3"
        key="tech-list-title-text"
        id="tech-list-title-text"
        data-testid="tech-list-title-text"
        titleText={'My Core Tech Stack'}
      />
    </Container>

    <Container
      component={'div'}
      id="tech-list-container"
      data-testid="tech-list-title-text"
      sx={{ display: 'flex', flexWrap: 'wrap' }}
    >
      <Container
        component={'section'}
        id="languages-wrapper"
        data-testid="tech-list-title-text"
        sx={techListSectionContainer}
      >
        <Text component={'h5'} titleVariant="h5" sx={techlistTextStyle} titleText={'Languages'} />
        <List key={'languages-list'} id={'languages-list'}>
          <RenderList data={languages} listMapCallback={renderTechLists} />
        </List>
      </Container>
      <Container
        component={'section'}
        id="libraries-wrapper"
        data-testid="tech-list-title-text"
        sx={techListSectionContainer}
      >
        <Text component={'h5'} titleVariant="h5" sx={techlistTextStyle} titleText={'Libraries'} />
        <List key={'libraries-list'} id={'libraries-list'}>
          <RenderList data={libraries} listMapCallback={renderTechLists} />
        </List>
      </Container>
      <Container
        component={'section'}
        id="build-wrapper"
        data-testid="tech-list-title-text"
        sx={techListSectionContainer}
      >
        <Text component={'h5'} titleVariant="h5" sx={techlistTextStyle} titleText={'Build'} />
        <List key={'build-list'} id={'build-list'}>
          <RenderList data={build} listMapCallback={renderTechLists} />
        </List>
      </Container>
      <Container
        component={'section'}
        id="databases-wrapper"
        data-testid="tech-list-title-text"
        sx={techListSectionContainer}
      >
        <Text component={'h5'} titleVariant="h5" sx={techlistTextStyle} titleText={'Databases'} />
        <List key={'databases-list'} id={'databases-list'}>
          <RenderList data={data} listMapCallback={renderTechLists} />
        </List>
      </Container>
      <Container
        component={'section'}
        id="cloud-wrapper"
        data-testid="tech-list-title-text"
        sx={techListSectionContainer}
      >
        <Text component={'h5'} titleVariant="h5" sx={techlistTextStyle} titleText={'Cloud'} />
        <List key={'cloud-list'} id={'cloud-list'}>
          <RenderList data={cloud} listMapCallback={renderTechLists} />
        </List>
      </Container>
      <Container
        component={'section'}
        id="styles-wrapper"
        data-testid="tech-list-title-text"
        sx={techListSectionContainer}
      >
        <Text component={'h5'} titleVariant="h5" sx={techlistTextStyle} titleText={'Styles'} />
        <List key={'styles-list'} id={'styles-list'}>
          <RenderList data={styles} listMapCallback={renderTechLists} />
        </List>
      </Container>
      <Container
        component={'section'}
        id="analytics-wrapper"
        data-testid="tech-list-title-text"
        sx={techListSectionContainer}
      >
        <Text component={'h5'} titleVariant="h5" sx={techlistTextStyle} titleText={'Analytics'} />
        <List key={'analytics-list'} id={'analytics-list'}>
          <RenderList data={analytics} listMapCallback={renderTechLists} />
        </List>
      </Container>
      <Container
        component={'section'}
        id="testing-wrapper"
        data-testid="tech-list-title-text"
        sx={techListSectionContainer}
      >
        <Text component={'h5'} titleVariant="h5" sx={techlistTextStyle} titleText={'Testing'} />
        <List key={'testing-list'} id={'testing-list'}>
          <RenderList data={testing} listMapCallback={renderTechLists} />
        </List>
      </Container>
    </Container>
  </Paper>
);

export default TechStackList;
