import type { SxProps } from '@mui/material/styles';
import handleScrollIntoView from '../../services/events/handle-scroll-into-view';
import { lazy, Suspense } from 'react';
import { Waiting } from '@bgdk/shared-react-components';

const title = `Chutes & Ladders / Tic Tac Toe`;
const body = `Yes, these are simple board games. When you take the concept of a board game, break it down into its individual parts, find the similarities and generalizations between board games generally, and isolate what makes each game unique, you can take this simple concept and generate a group of objects that you can easily build any board style game upon.`;

const titleSx: SxProps = {
  width: 'fit-content',
  maxWidth: '80%',
  textAlign: 'center',
};

const IFrameWithTitle = lazy(() => import('../../components/iframe/iframe-with-title'));

const Games = () => (
  <Suspense fallback={<Waiting />}>
    <IFrameWithTitle
      name="games"
      title={title}
      body={body}
      titleSx={titleSx}
      bodySx={titleSx}
      url="http://localhost:4200"
      scrollFunc={handleScrollIntoView}
    />
  </Suspense>
);

export default Games;
