
import React, { Component, PropTypes } from 'react';

import CreateUser from '../components/createUser';

export default class CounterManager extends Component {

  render () {
    
    return (
      <div>
        <h1>This is a list of counters</h1>
        <CreateUser /> 
      </div>

    );
  }
}
