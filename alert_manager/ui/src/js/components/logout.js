
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as AuthActions from '../actions/authActions';


class Logout extends Component {

   constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    e.preventDefault();

    console.log("Logging out");
    this.props.actions.logout();
  }

  render() {
    return <a style={{cursor: "pointer"}} onClick={this.handleClick}> Logout </a>;
    
  }                               
};


function mapStateToProps(state){
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
