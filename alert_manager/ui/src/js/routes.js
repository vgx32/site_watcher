import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './containers/app';
import FriendListApp from './containers/FriendListApp/FriendListApp';
import NotFoundView from './views/NotFoundView';
import AuthenticatedContainer from './containers/AuthenticatedContainer'
import CounterManager from './containers/CountersManager'


class TestComponent extends React.Component {
   
  render() {
    console.log("Authorized children : " + this.props.children);
    return (
      <div>
        <h3> Component mounted </h3>
      </div>);
  }
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={FriendListApp} />
    <Route path="/create-account" component={CounterManager} />
    <Route path="/about" component={CounterManager} />
    <Route path="/not-found" component={NotFoundView} />
    <Route path="/app" component={AuthenticatedContainer}>
      <Route path="/app/alerts" component={CounterManager} >
        <Route path="/app/alerts/:alertId" component={NotFoundView}/>
      </Route>
      <Route path="/app/results" component={CounterManager}>
        <Route path="/app/results/:resultId" component={NotFoundView}/>
      </Route>
      <Route path="/app/user" component={CounterManager} />
      
    </Route>

    
    <Redirect from="*" to="/not-found" />
  </Route>
);
