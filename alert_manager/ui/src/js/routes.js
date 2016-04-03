import React from 'react';
import { Route, IndexRedirect, Redirect } from 'react-router';

import App from './containers/app';
import FriendListApp from './containers/FriendListApp/FriendListApp';
import NotFoundView from './views/NotFoundView';
import AuthenticatedContainer from './containers/AuthenticatedContainer'
import CounterManager from './containers/CountersManager'
import CreateUser from './containers/CreateUser'
import Login from './containers/Login'


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
    <IndexRedirect to="/login" />
    <Route path="/create-user" component={CreateUser} />
    <Route path="/login" component={Login} />
    <Route path="/about" component={CounterManager} />
    <Route path="/not-found" component={NotFoundView} />
    <Route path="/app" component={AuthenticatedContainer}>
      <IndexRedirect to="/app/alerts" />
      <Route path="/app/alerts" component={CounterManager} >
        <Route path="/app/alerts/:alertId" component={NotFoundView}/>
      </Route>
      <Route path="/app/results" component={CounterManager}>
        <Route path="/app/results/:resultId" component={NotFoundView}/>
      </Route>
      <Route path="/app/account" component={CounterManager} />
      
    </Route>

    
    <Redirect from="*" to="/not-found" />
  </Route>
);
