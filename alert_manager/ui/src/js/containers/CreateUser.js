
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as AuthActions from '../actions/authActions';
import CreateUser from '../components/createUser';

class CreateUserContainer extends Component {

  render () {
    
    const { actions } = this.props;

    return (
      <div className="create-user">
        <h1>Create new Account </h1>
        <CreateUser createUser={actions.createUser} />
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
}

export default connect(
  function(){ return {}},
  mapDispatchToProps
)(CreateUserContainer);
