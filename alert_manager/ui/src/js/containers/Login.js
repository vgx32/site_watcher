
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as AuthActions from '../actions/authActions';
import Login from '../components/credentialsInput';

class CreateUserContainer extends Component {

  componentDidMount() {
    this.props.actions.clearAuthError();
  }

  render () {
    const { actions } = this.props;
    let { errorMessage } = this.props.auth;

    return (
      <div>
        <h3>Login to Existing Account </h3>
        <Login errorMessage={errorMessage} 
                    sendCredentials={actions.login} 
                    submitText="Login"/>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    auth: state.auth
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
)(CreateUserContainer);
