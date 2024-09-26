import type { SxProps } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import handleScrollIntoView from '../../services/events/handle-scroll-into-view';
import { lazy } from 'react';

const title = 'Crud App for Data Management';
const body = `Example of crud app with MUI X- DataGrid, debounced search bar for automatic search without requesting data while typing, uses public ${(<Link to={'https://github.com/lerocha/chinook-database'}>chinook database</Link>)} as the data.`;

const titleSx: SxProps = {
  width: 'fit-content',
  maxWidth: '80%',
  textAlign: 'center',
};

const IFrameWithTitle = lazy(() => import('../../components/iframe/iframe-with-title'));

const Crud = () => (
  <IFrameWithTitle
    name="crud"
    title={title}
    body={body}
    titleSx={titleSx}
    bodySx={titleSx}
    url="http://localhost:5200"
    scrollFunc={handleScrollIntoView}
  />
);
export default Crud;
