
import React, { Component, PropTypes } from 'react';

import ResultList from "../components/resultList";

class ResultListApp extends Component {

  render () {
    
    return (
      <div>
        <h1>List of Results</h1>
        <ResultList/>
      </div>
    );
  }
}


export default ResultListApp;