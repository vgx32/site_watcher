import React, { Component, PropTypes } from 'react';

import Result from './result';

export default class ResultList extends Component {

  render(){
    var results = this.props.results;
    var actions = this.props.actions;
    return (
      <div> 
       <h3> This is a Result list component </h3>
       <ul>
        {results.map((result) =>
          (
            <Result
              key={result.id}
              id={result.id}
              context={result.context}
              url={result.url}
              alert={result.alert}
              deleteResult={this.props.actions.deleteResult.bind({}, result.id)} />
          )
        ) 
      }
       </ul>
      </div>);
  }

}