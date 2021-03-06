
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as AuthActions from '../actions/authActions';
import CreateUser from '../components/credentialsInput';

class CreateUserContainer extends Component {

  componentDidMount() {
    this.props.actions.clearAuthError();
  }

  render () {
    const { actions } = this.props;
    let { errorMessage } = this.props.auth;

    return (
      <div className="create-user">
        <h3>Create new Account </h3>
        <CreateUser errorMessage={errorMessage} 
                    sendCredentials={actions.createUser} 
                    submitText="Create Account"/>
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
