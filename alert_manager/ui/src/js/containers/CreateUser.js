
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as AuthActions from '../actions/authActions';
import CreateUser from '../components/createUser';

class CreateUserContainer extends Component {

  componentDidMount() {
    this.props.actions.clearAuthError();
  }

  render () {
    const { actions } = this.props;
    let { errorMessage } = this.props.auth;

    return (
      <div className="create-user">
        <h1>Create new Account </h1>
        <CreateUser errorMessage={errorMessage} createUser={actions.createUser} />
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
