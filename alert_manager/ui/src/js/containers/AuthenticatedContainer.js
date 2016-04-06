import { Router, hashHistory, Link } from 'react-router';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


export default class AuthenticatedContainer extends Component {
  componentDidMount() {
    this.loadRootIfNotAuthed(this.props.auth);
  }


  shouldComponentUpdate(nextProps, nextState){
    this.loadRootIfNotAuthed(nextProps.auth);
    return nextProps.auth.token !== undefined;
  }

  loadRootIfNotAuthed(auth){
    if (!auth.token) {
      hashHistory.push('/');
      console.log("redirecting to home");
    } 
  }



   
  render() {
    return (
      <div>
        {this.props.children}
      </div>);
  }
}


function mapStateToProps(state){
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(AuthenticatedContainer); 
