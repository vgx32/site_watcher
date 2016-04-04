import React from 'react';
import { Route, IndexRedirect, Redirect } from 'react-router';

import FriendListApp from './containers/FriendListApp/FriendListApp';
import NotFoundView from './views/NotFoundView';

import Login from './containers/Login';
import App from './containers/App';
import AuthenticatedContainer from './containers/AuthenticatedContainer';
import CreateUser from './containers/CreateUser';
        

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
    <Route path="/about" component={NotFoundView} />
    <Route path="/not-found" component={NotFoundView} />
    <Route path="/app" component={AuthenticatedContainer}>
      <IndexRedirect to="/app/alerts" />
      <Route path="/app/alerts" component={NotFoundView} >
        <Route path="/app/alerts/:alertId" component={NotFoundView}/>
      </Route>
      <Route path="/app/results" component={NotFoundView}>
        <Route path="/app/results/:resultId" component={NotFoundView}/>
      </Route>
      <Route path="/app/account" component={NotFoundView} />
      
    </Route>

    
    <Redirect from="*" to="/not-found" />
  </Route>
);
