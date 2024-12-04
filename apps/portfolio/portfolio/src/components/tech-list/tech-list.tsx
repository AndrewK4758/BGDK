import { RenderList } from '@bgdk/shared-react-components';
import { Text } from '@bgdk/shared-react-components';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Theme from '../../styles/theme';

const languages = ['Typescript', 'NodeJs', 'Python'];
const libraries = ['React', 'React Router', 'Express', 'Prisma', 'PyTorch'];
const styles = ['Mui Material', 'Mui X', 'Tailwind CSS'];
const data = ['PostgreSQL', 'MongoDB', 'ChromaDB'];
const cloud = ['GCP', 'AWS', 'Azure'];
const build = ['Nx', 'Vite', 'Webpack', 'Docker'];
const analytics = ['Swagger'];
const testing = ['Jest', 'Playwright'];

const renderTechLists = (e: string, _i: number, _arr: string[]) => (
  <ListItem key={`${e}-wrapper`} id={`${e}-wrapper`} sx={{ justifyContent: 'space-between' }}>
    <ListItemText key={`${e}`} id={`${e}`}>
      {e}
    </ListItemText>
    <ListItemIcon key={`${e}-svg-icon-wrapper`} id={`${e}-svg-icon-wrapper`}>
      <img
        key={`${e}-svg-icon`}
        src={`/icons/${e.toLowerCase()}-icon.svg`}
        alt={`${e}-icon`}
        style={{ width: '32px', height: 'auto' }}
      />
    </ListItemIcon>
  </ListItem>
);

const TechStackList = () => (
  <Paper elevation={24} sx={{ height: 'fit-content', p: 2 }}>
    <Container component={'div'} id="tech-list-text-container" sx={{ width: 'fit-content' }}>
      <Text titleVariant="h3" titleText={'My Core Tech Stack'} />
    </Container>

    <Container id="tech-list-container" sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <Container
        component={'section'}
        id="languages-wrapper"
        sx={{ flex: '1 0 25%', paddingY: 2, borderTop: `2px solid ${Theme.palette.primary.dark}` }}
      >
        <Text
          titleVariant="h5"
          sx={{ borderBottom: `2px solid ${Theme.palette.primary.dark}`, width: 'fit-content' }}
          titleText={'Languages'}
        />
        <List key={'languages-list'} id={'languages-list'}>
          <RenderList data={languages} listMapCallback={renderTechLists} />
        </List>
      </Container>
      <Container
        component={'section'}
        id="libraries-wrapper"
        sx={{ flex: '1 0 25%', paddingY: 2, borderTop: `2px solid ${Theme.palette.primary.dark}` }}
      >
        <Text
          titleVariant="h5"
          sx={{ borderBottom: `2px solid ${Theme.palette.primary.dark}`, width: 'fit-content' }}
          titleText={'Libraries'}
        />
        <RenderList data={libraries} listMapCallback={renderTechLists} />
      </Container>
      <Container
        component={'section'}
        id="build-wrapper"
        sx={{ flex: '1 0 25%', paddingY: 2, borderTop: `2px solid ${Theme.palette.primary.dark}` }}
      >
        <Text
          titleVariant="h5"
          sx={{ borderBottom: `2px solid ${Theme.palette.primary.dark}`, width: 'fit-content' }}
          titleText={'Build'}
        />
        <RenderList data={build} listMapCallback={renderTechLists} />
      </Container>
      <Container
        component={'section'}
        id="databases-wrapper"
        sx={{ flex: '1 0 25%', paddingY: 2, borderTop: `2px solid ${Theme.palette.primary.dark}` }}
      >
        <Text
          titleVariant="h5"
          sx={{ borderBottom: `2px solid ${Theme.palette.primary.dark}`, width: 'fit-content' }}
          titleText={'Databases'}
        />
        <RenderList data={data} listMapCallback={renderTechLists} />
      </Container>
      <Container
        component={'section'}
        id="cloud-wrapper"
        sx={{ flex: '1 0 25%', paddingY: 2, borderTop: `2px solid ${Theme.palette.primary.dark}` }}
      >
        <Text
          titleVariant="h5"
          sx={{ borderBottom: `2px solid ${Theme.palette.primary.dark}`, width: 'fit-content' }}
          titleText={'Cloud'}
        />
        <RenderList data={cloud} listMapCallback={renderTechLists} />
      </Container>
      <Container
        component={'section'}
        id="styles-wrapper"
        sx={{ flex: '1 0 25%', paddingY: 2, borderTop: `2px solid ${Theme.palette.primary.dark}` }}
      >
        <Text
          titleVariant="h5"
          sx={{ borderBottom: `2px solid ${Theme.palette.primary.dark}`, width: 'fit-content' }}
          titleText={'Styles'}
        />
        <RenderList data={styles} listMapCallback={renderTechLists} />
      </Container>
      <Container
        component={'section'}
        id="analytics-wrapper"
        sx={{ flex: '1 0 25%', paddingY: 2, borderTop: `2px solid ${Theme.palette.primary.dark}` }}
      >
        <Text
          titleVariant="h5"
          sx={{ borderBottom: `2px solid ${Theme.palette.primary.dark}`, width: 'fit-content' }}
          titleText={'Analytics'}
        />
        <RenderList data={analytics} listMapCallback={renderTechLists} />
      </Container>
      <Container
        component={'section'}
        id="testing-wrapper"
        sx={{ flex: '1 0 25%', paddingY: 2, borderTop: `2px solid ${Theme.palette.primary.dark}` }}
      >
        <Text
          titleVariant="h5"
          sx={{ borderBottom: `2px solid ${Theme.palette.primary.dark}`, width: 'fit-content' }}
          titleText={'Testing'}
        />
        <RenderList data={testing} listMapCallback={renderTechLists} />
      </Container>
    </Container>
  </Paper>
);

export default TechStackList;
