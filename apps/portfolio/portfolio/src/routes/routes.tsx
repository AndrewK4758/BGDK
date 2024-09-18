import { RouteObject } from 'react-router-dom';
import Layout from '../components/layout/layout';

const appRoute: RouteObject = {
  path: '/',
  Component: Layout,
};

const routes: RouteObject[] = [appRoute];

export default routes;
