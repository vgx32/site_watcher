import React from 'react';
import { Route, IndexRedirect, Redirect } from 'react-router';

import FriendListApp from './containers/FriendListApp/FriendListApp';
import NotFoundView from './views/NotFoundView';

import Login from './containers/Login';
import App from './containers/App';
import AlertListApp from './containers/AlertListApp';
import ResultListApp from './containers/ResultListApp';

import About from './components/about';
import AccountDetails from './components/accountDetails';
import ResultDetail from './components/resultDetail';
import AlertDetail from './components/alertDetail';

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
    <Route path="/about" component={About} />
    <Route path="/not-found" component={NotFoundView} />
    <Route path="/app" component={AuthenticatedContainer}>
      <IndexRedirect to="/app/alerts" />
      <Route path="/app/alerts" component={AlertListApp} >
        <Route path="/app/alerts/:alertId" component={AlertDetail}/>
      </Route>
      <Route path="/app/results" component={ResultListApp}>
        <Route path="/app/results/:resultId" component={ResultDetail}/>
      </Route>
      <Route path="/app/account" component={AccountDetails} />
      
    </Route>

    
    <Redirect from="*" to="/not-found" />
  </Route>
);
