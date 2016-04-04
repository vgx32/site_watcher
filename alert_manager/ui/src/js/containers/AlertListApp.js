
import React, { Component, PropTypes } from 'react';

import AlertList from "../components/alertList";
import AddAlert from "../components/addAlert";

class AlertListApp extends Component {

  render () {
    
    return (
      <div>
        <AddAlert />
        <h1>List of existing Alerts</h1>
        <AlertList/>
      </div>
    );
  }
}


export default AlertListApp;