import React, { Component, PropTypes } from 'react';

import Alert from './alert';

export default class AlertList extends Component {

  render(){
    return (
      <div> 
       <h3> This is an alert list component single Alert component </h3>
       <ul>
        <li><Alert/> </li>
        <li><Alert/> </li>
       </ul>
      </div>);
  }
}