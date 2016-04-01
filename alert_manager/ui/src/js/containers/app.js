import { Link } from 'react-router';
import React, { Component } from 'react';


export default class App extends Component {

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
        <Link to="/not-found" > Logout </Link> {/*TODO: add component to logout*/}
      </div>
    );
    return (
      <div className="page-container">
        {authedHeader}
        {this.props.children}
      </div>
    );
  }
}
