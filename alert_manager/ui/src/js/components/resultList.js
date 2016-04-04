import React, { Component, PropTypes } from 'react';

import Result from './result';

export default class ResultList extends Component {

  render(){
    return (
      <div> 
       <h3> This is a Result list component </h3>
       <ul>
        <li><Result/> </li>
        <li><Result/> </li>
       </ul>
      </div>);
  }
}