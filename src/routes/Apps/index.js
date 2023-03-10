import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';

const Dashboards = ({ match }) => {
  const requestedUrl = match.url.replace(/\/$/, '');

  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Redirect exact from={`${requestedUrl}/`} to={`${requestedUrl}/to-do`} />
        <Route path={`${requestedUrl}/contact`} component={lazy(() => import('./ContactApp'))} />
        <Route path={`${requestedUrl}/social-apps/profile`} component={lazy(() => import('./Profile'))} />
        <Route path={`${requestedUrl}/social-apps/wall`} component={lazy(() => import('./Wall'))} />
        <Route component={lazy(() => import('../ExtraPages/404'))} />
      </Switch>
    </Suspense>
  );
};

export default Dashboards;
