import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './containers/app';
import FriendListApp from './containers/FriendListApp/FriendListApp';
import NotFoundView from './views/NotFoundView';
import CounterManager from './containers/CountersManager'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={FriendListApp} />
    <Route path="/counters" component={CounterManager} />
    <Route path="/not-found" component={NotFoundView} />
    <Redirect from="*" to="/not-found" />
  </Route>
);
