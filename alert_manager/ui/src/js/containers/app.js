import React, { Component } from 'react';
import { Link } from 'react-router';


export default class App extends Component {
  render() {
    return (
      <div className="page-container">
        <Link to="/" > Home </Link>
        <Link to="/counters" > counterss!! </Link>
        {this.props.children}
      </div>
    );
  }
}
