import { RouteObject } from 'react-router-dom';
import Layout from '../components/layout/layout';
import emailFormAction from '../services/actions/email-form-action';

const appRoute: RouteObject = {
  path: '/',
  Component: Layout,
  action: emailFormAction,
};

const routes: RouteObject[] = [appRoute];

export default routes;
