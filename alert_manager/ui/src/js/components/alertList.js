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
              id={alert.id}
              root_url={alert.root_url}
              scrape_level={alert.scrape_level}
              search_terms={alert.search_terms}
              analysis_op={alert.analysis_op}
              notification_type={alert.notification_type}
              last_ran={alert.last_ran}
              editAlert={this.props.actions.editAlert.bind({}, alert.id)}          
              deleteAlert={this.props.actions.deleteAlert.bind({}, alert.id)} />))
        }
       </ul>
      </div>);
  }

}