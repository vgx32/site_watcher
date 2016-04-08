
import React, { Component} from 'react';

import AlertList from "../components/alertList";
import CreateAlert from "../components/createAlert";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AlertActions from '../actions/AlertActions';


class AlertListApp extends Component {

  render () {
    const {alertList, actions} = this.props;
    return (
      <div>
        <CreateAlert createAlert={actions.createAlert}/>
        <h1>List of existing Alerts</h1>
        <AlertList alerts={alertList} actions={actions}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    alertList: state.alertList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AlertActions, dispatch)
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertListApp);
