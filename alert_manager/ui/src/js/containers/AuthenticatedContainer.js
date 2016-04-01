import { Router, hashHistory, Link } from 'react-router';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


export default class AuthenticatedContainer extends Component {
   componentDidMount() {
    // const { dispatch, currentUser } = this.props;
    if (true) {
      // dispatch(Actions.currentUser());
      console.log("authorization successful");
    } else {
      hashHistory.push('/');
      console.log("redirecting to home");
    }
  }

  render() {
    return (
      <div>
        <h3> This is authenticated </h3>
        {this.props.children}


      </div>);
  }
}