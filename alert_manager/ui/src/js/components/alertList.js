import React, { Component, PropTypes } from 'react';

import Alert from './alert';

export default class AlertList extends Component {

  render(){
    var alerts = this.props.alerts;
    var actions = this.props.actions;
    return (
      <div> 
       <h3> Current Alerts: </h3>
       <ul>
        {alerts.map((alert) =>
          (
            <Alert
              key={alert.id}
              {...alert}
              editAlert={actions.editAlert.bind({}, alert.id)}          
              toggleEdit={actions.toggleEditAlert.bind({}, alert.id)}          
              deleteAlert={actions.deleteAlert.bind({}, alert.id)} />))
        }
       </ul>
      </div>);
  }

}