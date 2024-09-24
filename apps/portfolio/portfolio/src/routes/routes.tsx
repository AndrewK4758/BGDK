import { RouteObject } from 'react-router-dom';
import Layout from '../components/layout/layout';
import emailFormAction from '../services/actions/email-form-action';
import Games from '../pages/games/games';
import Crud from '../pages/crud/crud';

const routes: RouteObject[] = [
  {
    path: '/',
    Component: Layout,
    action: emailFormAction,
    children: [
      {
        path: 'games',
        Component: Games,
      },
      {
        path: 'crud',
        Component: Crud,
      },
    ],
  },
];

export default routes;
