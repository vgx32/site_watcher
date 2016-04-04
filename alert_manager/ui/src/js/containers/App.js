import { Link } from 'react-router';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import Logout from "../components/logout"

class App extends Component {

  render() {
    var unAuthedHeader = (
      <div>
        <Link to="/login" > Login </Link>
        <Link to="/create-user" > Create Acount</Link>
        <Link to="/about" > About </Link>
      </div>);
    var authedHeader = (
      <div>
        <Link to="/app/alerts" > Alerts </Link>
        <Link to="/app/results" > Scrape Results </Link>
        <Link to="/app/account" > Account </Link>
        <Logout />
      </div>
    );
    var renderedHeader = this.props.auth.token? authedHeader : unAuthedHeader;
    return (
      <div className="page-container">
        {renderedHeader}
        {this.props.children}
      </div>
    );
  }
}


function mapStateToProps(state){
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(App); 
