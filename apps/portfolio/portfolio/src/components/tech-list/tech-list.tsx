import { RenderList } from '@bgdk/shared-react-components';
import { Text } from '@bgdk/shared-react-components';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Theme from '../../styles/theme';
import type { SxProps } from '@mui/material/styles';

export const languages = ['Typescript', 'NodeJs', 'Python'];
export const libraries = ['React', 'React Router', 'Express', 'Prisma', 'PyTorch'];
export const styles = ['Mui Material', 'Mui X', 'Tailwind CSS'];
export const data = ['PostgreSQL', 'MongoDB', 'ChromaDB'];
export const cloud = ['GCP', 'AWS', 'Azure'];
export const build = ['Nx', 'Vite', 'Webpack', 'Docker'];
export const analytics = ['Swagger'];
export const testing = ['Jest', 'Playwright'];

const techListSectionContainer: SxProps = {
  flex: '1 0 25%',
  paddingY: 2,
  borderTop: `2px solid ${Theme.palette.primary.dark}`,
};

const techlistTextStyle: SxProps = { borderBottom: `2px solid ${Theme.palette.primary.dark}`, width: 'fit-content' };

const renderTechLists = (e: string, _i: number, _arr: string[]) => (
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

const TechStackList = () => (
  <Paper elevation={24} sx={{ height: 'fit-content', p: 2 }}>
    <Container
      component={'div'}
      id="tech-list-text-container"
      data-testid="tech-list-title-text"
      sx={{ width: 'fit-content' }}
    >
      <Text
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
        <Text titleVariant="h5" sx={techlistTextStyle} titleText={'Languages'} />
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
        <Text titleVariant="h5" sx={techlistTextStyle} titleText={'Libraries'} />
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
        <Text titleVariant="h5" sx={techlistTextStyle} titleText={'Build'} />
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
        <Text titleVariant="h5" sx={techlistTextStyle} titleText={'Databases'} />
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
        <Text titleVariant="h5" sx={techlistTextStyle} titleText={'Cloud'} />
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
        <Text titleVariant="h5" sx={techlistTextStyle} titleText={'Styles'} />
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
        <Text titleVariant="h5" sx={techlistTextStyle} titleText={'Analytics'} />
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
        <Text titleVariant="h5" sx={techlistTextStyle} titleText={'Testing'} />
        <List key={'testing-list'} id={'testing-list'}>
          <RenderList data={testing} listMapCallback={renderTechLists} />
        </List>
      </Container>
    </Container>
  </Paper>
);

export default TechStackList;
